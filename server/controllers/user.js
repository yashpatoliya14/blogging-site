// controllers/auth.js
const bcrypt   = require('bcryptjs');
const {signJwt,genOtp,sendEmail} = require('../services/auth')
const User     = require('../models/User');


// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/signup
// @desc    Register new user & send OTP
// ─────────────────────────────────────────────────────────
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ success: false, msg: 'All fields required' });

    if (await User.findOne({ email }))
      return res.status(400).json({ success: false, msg: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password: hash, isVerified: false });

    // Immediately send OTP
    await sendOtpInternal(user); // helper below

    res.status(201).json({
      success: true,
      msg: 'Signup successful. OTP sent to your email to verify the account.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/signin
// @desc    Authenticate & return JWT
// ─────────────────────────────────────────────────────────
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, msg: "User doesn't exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, msg: 'Invalid Password' });

    if (!user.isVerified)
      return res.status(400).json({ success: false, msg: 'Email not verified. Please verify OTP.' });

    const token = signJwt({ id: user._id });

    res.status(200).json({ success: true, msg: 'Signin successful', token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/send-otp
// @desc    Resend OTP for email verification (needs email)
// ─────────────────────────────────────────────────────────
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, msg: "User doesn't exist" });

    if (user.isVerified)
      return res.status(400).json({ success: false, msg: 'User already verified' });

    await sendOtpInternal(user);

    res.status(200).json({ success: true, msg: 'OTP sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/verify-otp
// @desc    Verify OTP & activate account
// ─────────────────────────────────────────────────────────
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, msg: "User doesn't exist" });

    if (!user.otpHash || !user.otpExpiry)
      return res.status(400).json({ success: false, msg: 'Please request a new OTP' });

    if (Date.now() > user.otpExpiry)
      return res.status(400).json({ success: false, msg: 'OTP expired. Request a new one.' });

    const isMatch = await bcrypt.compare(otp, user.otpHash);
    if (!isMatch)
      return res.status(400).json({ success: false, msg: 'Invalid OTP' });

    user.isVerified = true;
    user.otpHash = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ success: true, msg: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// ─────────────────────────────────────────────────────────
// Internal helper: generate, hash, save, and mail OTP
// ─────────────────────────────────────────────────────────
async function sendOtpInternal(user) {
  const otp = genOtp();
  const otpHash = await bcrypt.hash(otp, 12);
  const expiry   = Date.now() + (Number(process.env.OTP_EXPIRY_MIN || 15) * 60 * 1000);

  user.otp   = otpHash;
  user.otpExpire = expiry;
  await user.save();

  await sendEmail(
    user.email,
    'Your verification code',
    `<p>Hello ${user.name || ''},</p>
     <p>Your verification code is:</p>
     <h2 style="letter-spacing:2px;">${otp}</h2>
     <p>This code will expire in ${process.env.OTP_EXPIRY_MIN || 15} minutes.</p>`
  );
}

module.exports = { signUp, signIn, sendOtp, verifyOtp };

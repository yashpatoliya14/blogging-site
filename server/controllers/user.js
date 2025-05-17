// controllers/auth.js
const bcrypt = require('bcryptjs');
const { genOtp, signJwt, mailOtp } = require('../services/auth')
const User = require('../models/User');
const TempUser = require('../models/TempUser');


// POST /api/auth/signup
exports.signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 1️⃣ already verified?
    if (await User.findOne({ email }))
      return res.status(400).json({ success: false, msg: 'Email already registered.' });

    // 2️⃣ pending verification? -> purge & overwrite (optional)
    await TempUser.deleteOne({ email });

    const hash = await bcrypt.hash(password, 12);
    const otp = genOtp();
    const otpExpire = Date.now() + (+(process.env.OTP_EXPIRY_MIN || 15) * 60 * 1000);

    await TempUser.create({ name, email, password: hash, otp, otpExpire });
    await mailOtp(email, otp);

    res.status(201).json({
      success: true,
      msg: 'Check your email for the OTP to verify your account.'
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// POST /api/auth/verify-otp
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser)
      return res.status(400).json({ success: false, msg: 'No pending signup found.' });

    if (Date.now() > tempUser.otpExpire)
      return res.status(400).json({ success: false, msg: 'OTP expired.' });

    if (otp.toString() !== tempUser.otp)
      return res.status(400).json({ success: false, msg: 'Invalid OTP.' });

    // Move data into User
    const user = await User.create({
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true
    });

    await TempUser.deleteOne({ _id: tempUser._id });

    const token = signJwt({ id: user._id });
    res.cookie('token', token, {
      httpOnly: true,                 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',              
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days 
    })
    res.status(200).json({
      success: true,
      msg: 'Email verified & account created!',
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// POST /api/auth/send-otp  (resend)
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser)
      return res.status(400).json({ success: false, msg: 'No pending signup found.' });

    const otp = genOtp();
    const otpExp = Date.now() + (+(process.env.OTP_EXPIRY_MIN || 15) * 60 * 1000);

    tempUser.otp = otp;
    tempUser.otpExpire = otpExp;
    await tempUser.save();
    await mailOtp(email, otp);

    res.status(200).json({ success: true, msg: 'OTP resent.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// POST /api/auth/signin
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, msg: 'User not found.' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ success: false, msg: 'Invalid credentials.' });

    const token = signJwt({ id: user._id });

    res.status(200).json({
      success: true,
      msg: 'Signin successful',
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};
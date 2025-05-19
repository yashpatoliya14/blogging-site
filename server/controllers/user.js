// controllers/auth.js
const bcrypt = require('bcryptjs');
const { genOtp, signJwt, mailOtp } = require('../services/auth')
const User = require('../models/User');
const TempUser = require('../models/TempUser');


// POST /api/auth/signup
exports.signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // already verified?
    if (await User.findOne({ email }))
      return res.json({ success: false, msg: 'Email already registered.' });
    
    const hash = await bcrypt.hash(password, 12) //hash passoword
    const otp = genOtp(); //generate password
    const otpExpire = Date.now() + ( 10 * 60 * 1000)//set otp expire time
    await TempUser.create({ name, email, password: hash, otp, otpExpire });
    
    //send otp
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
      return res.json({ success: false, msg: 'No pending signup found.' });

    if (Date.now() > tempUser.otpExpire)
      return res.json({ success: false, msg: 'OTP expired.' });

    if (otp.toString() !== tempUser.otp)
      return res.json({ success: false, msg: 'Invalid OTP.' });

    // temp user to user schema
    const user = await User.create({
      name:tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true
    });

    await TempUser.deleteOne({ _id: tempUser._id });


    //------------------------------------------set the token 
    const token = signJwt({ id: user._id });
    res.cookie('token', token, {
      httpOnly: true,                 
      secure: true, 
      sameSite: 'None',              
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days 
    })

    res.status(201).json({
      success: true,
      msg: 'Email verified & account created!',
      token,
      user: { id: user._id, email: user.email, name:user.name }
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
      return res.json({ success: false, msg: 'No pending signup found.' });

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
      return res.json({ success: false, msg: 'User not found.' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.json({ success: false, msg: 'Invalid Password.' });

    //-----------------------------------set the token in signin
    const token = signJwt({ id: user._id });
    res.cookie('token', token, {
      httpOnly: true,                 
      secure: true, 
      sameSite: 'None',              
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days 
    })
    return res.status(200).json({
      success: true,
      msg: 'Signin successful',
      token,
      user: { id: user._id, email: user.email,name : user.name }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};
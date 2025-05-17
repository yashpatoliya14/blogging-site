const jwt         = require('jsonwebtoken');
const nodemailer  = require('nodemailer');
const otpGenerator = require('otp-generator')
require('dotenv').config();
const signJwt = (payload) =>{
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}
const genOtp = () => otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com', // SMTP server for your email provider
  port: 465, // Common secure port
  secure: true,
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const mailOtp = (to, otp) =>{
  console.log(process.env.SMTP_USER);
  
  return transporter.sendMail({
    from: process.env.SMTP_USER || 'yashpatoliya@getMaxListeners.com',
    to,
    subject: 'Your verification code',
    html: `<p>Your verification code:</p><h2>${otp}</h2>`
  },(err)=>{
    console.log(err);
    
  });
}


  module.exports = {
    signJwt,
    genOtp,
    mailOtp
  }
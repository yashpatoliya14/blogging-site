const jwt      = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const signJwt = (payload) =>{
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const transporter = nodemailer.createTransport({
  service: 'gmail',                                         // or any SMTP service you prefer
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

const sendEmail = (to, subject, html) =>
  transporter.sendMail({ from: `"Auth Demo" <${process.env.SMTP_USER}>`, to, subject, html });

const genOtp = () => {
    Math.floor(100000 + Math.random() * 900000).toString()
}; 

module.exports = {
    signJwt,
    sendEmail,
    genOtp
}

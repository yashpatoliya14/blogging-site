const express = require('express')
const { signIn, signUp, sendOtp, verifyOtp } = require('../controllers/user')
Router = express.Router()

Router.post('/signin', signIn )
Router.post('/signup', signUp)
Router.post('/send-otp',sendOtp)
Router.post('/verify-otp',verifyOtp)
Router.post('/send-otp',sendOtp) // resend

module.exports = Router
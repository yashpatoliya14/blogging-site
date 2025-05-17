const express = require('express')
Router = express.Router()

Router.get('/signin', signIn )
Router.get('/signup', signUp)
Router.post('/send-otp',sendOtp)
Router.post('/verify-otp',verifyOtp)

module.exports = Router
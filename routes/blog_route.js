const express = require('express')
const { blogPublish } = require('../controllers/blog')
Router = express.Router()

Router.get('/', (req, res) => { res.send('hello') })
Router.get('/:id', (req, res) => { })
Router.post('/publish',blogPublish)
Router.post('/save-draft', (req, res) => { })

module.exports = Router
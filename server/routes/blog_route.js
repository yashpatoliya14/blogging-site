const express = require('express')
const { blogPublish, getBlogById, getAllBlog } = require('../controllers/blog')
Router = express.Router()

Router.get('/', getAllBlog )
Router.get('/:id', getBlogById)
Router.post('/publish',blogPublish)
Router.post('/save-draft', (req, res) => { })

module.exports = Router
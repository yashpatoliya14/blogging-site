const express = require('express')
const { blogPublish, getBlogById, getAllBlog ,blogSaveDraft} = require('../controllers/blog')
Router = express.Router()

Router.get('/', getAllBlog )
Router.get('/:id', getBlogById)
Router.post('/publish/:id',blogPublish)
Router.post('/save-draft',blogSaveDraft)

module.exports = Router
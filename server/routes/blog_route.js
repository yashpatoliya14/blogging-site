const express = require('express')
const { blogPublish, getBlogById, getAllBlog ,blogSaveDraft, deleteBlog} = require('../controllers/blog')
Router = express.Router()

Router.get('/', getAllBlog )
Router.get('/:id', getBlogById)
Router.post('/publish/:id',blogPublish)
Router.post('/save-draft',blogSaveDraft)
Router.delete('/:id',deleteBlog)

module.exports = Router
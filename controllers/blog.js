const Blog = require('../models/Blog')

//this function use to create a blog and store into database
const blogPublish = async (req, res) => {
    try {
        const { title, content, tags } = req.body
        const blog = await Blog.create({
            title,
            content,
            tags:tags ?? [],
            status: 'published'
        })
        return res.status(200).json({ success: true, msg: "blog is published", data: blog })
    } catch (err) {

        console.log("error at publish route", err)

        return res.status(500).json({ success: false, msg: "blog publish error" })

    }
}

//this function use to get a blog by id from database
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params

        const blog = await Blog.create({
            title,
            content,
            tags:tags ?? [],
            status: 'published'
        })
        
        return res.status(200).json({ success: true, msg: "blog is published", data: blog })
    } catch (err) {

        console.log("error at publish route", err)

        return res.status(500).json({ success: false, msg: "blog publish error" })

    }
}

//this function use to get all blogs
const getAllBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body
        const blog = await Blog.create({
            title,
            content,
            tags:tags ?? [],
            status: 'published'
        })
        return res.status(200).json({ success: true, msg: "blog is published", data: blog })
    } catch (err) {

        console.log("error at publish route", err)

        return res.status(500).json({ success: false, msg: "blog publish error" })

    }
}

module.exports = {
    blogPublish,
    getBlogById,
    getAllBlog
}
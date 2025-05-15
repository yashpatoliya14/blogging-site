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

        const blog = await Blog.findById({_id:id})

        if(blog){
            
            return res.status(200).json({ success: true, msg: "Blog get successful", data: blog })
        
        }else{

            return res.status(400).json({ success: false, msg: "Blog doesn't found"})

        }

    } catch (err) {

        console.log("error at get blog by id route", err)

        return res.status(500).json({ success: false, msg: "Blog found error" })

    }
}

//this function use to get all blogs
const getAllBlog = async (req, res) => {
    try {

        const blogs = await Blog.find({})
        
        if(blogs){
            
            return res.status(200).json({ success: true, data: blogs })
        
        }else{

            return res.status(400).json({ success: false, msg: "Blog doesn't found"})

        }

    } catch (err) {

        console.log("error at get all blogs route", err)

        return res.status(500).json({ success: false, msg: "blog found error" })

    }
}

module.exports = {
    blogPublish,
    getBlogById,
    getAllBlog
}
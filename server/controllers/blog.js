const { default: mongoose } = require('mongoose')
const Blog = require('../models/Blog')

// @route POST /api/blog/publish/:id
// @des this function use to create a blog and store into database
const blogPublish = async (req, res) => {
    try {
        const {id } = req.params
        const { title, content, tags,userId } = req.body
        console.log(title);
        const blog = await Blog.updateOne({_id:id },{
            title,
            content,
            tags:tags ?? [],
            status: 'published',
            userId
        })
        return res.status(200).json({ success: true, msg: "blog is published", data: blog })
    } catch (err) {

        console.log("error at publish route", err)

        return res.status(500).json({ success: false, msg: "blog publish error" })

    }
}

// @route POST /api/blog/save-draft
// @des this function helps into save the blog if blog id exist then update exiting one otherwise create
const blogSaveDraft = async (req, res) => {
    try {
        const { title, content, tags,id,userId } = req.body
        console.log(id,title);
        
        let blog;
        if(id){
            //update
             const blog = await Blog.findByIdAndUpdate(id,{
                title,
                content,
                tags:tags ?? [],
                status: 'draft',
                userId
                })
            if (!blog) {
                return res.status(404).json({ success: false, msg: 'Draft not found' });
            }
        }else{

            //create
            blog = await Blog.create({
                title,
                content,
                tags:tags ?? [],
                status: 'draft',
                userId
            })
        }

        return res.status(200).json({ success: true, msg: "blog saved", data: blog })
    } catch (err) {

        console.log("error at blog save route", err)

        return res.status(500).json({ success: false, msg: "blog doesn't save error" })

    }
}

// @route GET /api/blog/:id
// @des this function use to get a blog by id from database
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

// @route GET /api/blog/
// @des this function use to get all blogs
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
    getAllBlog,
    blogSaveDraft
}
const { get } = require('mongoose');
const BlogPost = require('../models/blog');

const createBlog = async (req, res)=>{
    // we need to get the data from the body
    const{title,content ,tags,author,isThreaded,parentId} = req.body;

    try {
        const newBlog = await BlogPost.create({
            title,
            content,
            tags,
            author,
            isThreaded , 
            parentId: parentId || null
        });  
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog: newBlog
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Error creating blog",
            error: err.message
        });
    }
};

const getAllBlogs = async (req, res )=>{

    try{
        const blogs = await BlogPost.find({}).sort({createdAt : -1});
        res.status(200).json({
            success : true,
            blogs
        });
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "Errror fetching blogs",
            error : err.message
        });
    }
};

const getBlogById = async(req , res)=>{
    const {id} = req.params;

    try{
        const blog = await BlogPost.findById(id);
        if(!blog)
        {
            return res.status(404).json(
                {
                    success : false,
                    message : "Blog not found"
                });
        }
        res.status(200).json({
            success : true,
            blog
        });
    }
    catch(err){
        success : false,
        res.status(500).json({
            success : false,
            message : "Error fetching blog",
            error : err.message
        });
    }
};

const updateBlog = async(req,res)=>{
     const {id} = req.params;
     const {title, content, tags, author, isThreaded, parentId} = req.body;

    try {
        const updateBlog = await BlogPost.findByIdAndUpdate(id,{
            title,
            content,
            tags,
            author,
            isThreaded,
            parentId: parentId || null
            },
            {new : true , runValidators: true});
            if(!updateBlog){
                return res.status(404).json({
                    success: false,
                    message: "Blog not found"
                });
            }
            res.status(200).json({
                success : true,
                message : "Blog updated Successfully",
                blog: updateBlog
            })
        }
    catch(err){
        res.status(500).json({
            success : false,
            message : "Error updating blog",
            error : err.message
        })
    }
}

const deleteBlog = async(req , res)=>{
    const {id} = req.params;
    try{
        const deleted = await BlogPost.findByIdAndDelete(id);
        if(!deleted)
        {
            res.status(404).json({
                success : false,
                message : "Blog not found "

            })
        }
        res.status(200).json({
            success : true,
            message : "Blog Deleted Successfully"

        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "Error while Deleting blog",
            error : err.message
        })
    }
};


module.exports = {createBlog ,getAllBlogs ,getBlogById, updateBlog , deleteBlog};
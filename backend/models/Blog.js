const mongoose = require('mongoose');

// New schema for blog posts 
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now, required: true },
    author: { type: String, required: true },
    isThreaded: { type: Boolean, default: false },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', default: null },
});

// Exporting the model
const BlogPost = mongoose.model('BlogPost', blogSchema);
module.exports = BlogPost;

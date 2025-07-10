// blogRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById, 
  updateBlog
  // other controllers will be added later
} = require('../controllers/blogController');

router.post('/blogs',createBlog); 
router.get('/',getAllBlogs);
router.get('/:id',getBlogById); 
router.patch('/:id',updateBlog);

module.exports = router;

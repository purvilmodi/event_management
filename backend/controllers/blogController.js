// blogController.js
const Blog = require('../models/blog');
const path = require('path');

// Create a new blog with an image upload
exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Store the image path
    const newBlog = new Blog({ title, description, image });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog with a new image (if uploaded)
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Keep old image if no new one uploaded
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description, image }, { new: true });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully', deletedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

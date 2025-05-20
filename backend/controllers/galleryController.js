const Gallery = require('../models/Gallery');
const path = require('path');

exports.getGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    res.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ message: 'Error fetching gallery items' });
  }
};

exports.addGalleryItem = async (req, res) => {
  try {
    const { title, mediaType } = req.body;

    if (!req.file) {
      console.error('No file was uploaded');
      return res.status(400).json({ message: 'File is required' });
    }

    console.log('File uploaded:', req.file);

    
    const mediaUrl = `/uploads/${req.file.filename}`;

    const newGalleryItem = new Gallery({ title, mediaType, mediaUrl });
    await newGalleryItem.save();

    res.status(201).json(newGalleryItem);
  } catch (error) {
    console.error('Error in addGalleryItem:', error);
    res.status(500).json({ message: 'Error adding gallery item' });
  }
};


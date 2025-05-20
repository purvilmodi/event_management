const express = require('express');
const { getGalleryItems, addGalleryItem } = require('../controllers/galleryController');
const upload = require('../middleware/multerConfig');
const router = express.Router();
const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

router.get('/', getGalleryItems);
router.post('/', upload.single('media'), addGalleryItem);
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Attempting to delete item with ID: ${id}`);

      const deletedItem = await Gallery.findByIdAndDelete(id);
      
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }

      // Delete file from server (if storing files locally)
      const filePath = path.join(__dirname, '..', 'uploads', deletedItem.mediaUrl.split('/uploads/')[1]);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.json({ message: 'Item deleted successfully', deletedItem });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  // Configure file storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
 const uploads = multer({ storage });

// UPDATE a gallery item (title or media)
router.put('/:id', upload.single('media'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const existingItem = await Gallery.findById(id);
    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    let updatedData = { title: req.body.title };

    // If a new file is uploaded, update mediaUrl and delete old file
    if (req.file) {
      const newMediaUrl = `/uploads/${req.file.filename}`;
      const oldFilePath = path.join(__dirname, '..', 'uploads', existingItem.mediaUrl.split('/uploads/')[1]);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      updatedData.mediaUrl = newMediaUrl;
      updatedData.mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
    }

    const updatedItem = await Gallery.findByIdAndUpdate(id, updatedData, { new: true });

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

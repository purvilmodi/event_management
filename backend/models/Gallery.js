const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  mediaType: { type: String, enum: ['image', 'video'] },
  mediaUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;

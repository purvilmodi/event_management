const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  place: { type: String, required: true },
  mainImage: { type: String, required: true }, 
  media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }]
});

module.exports = mongoose.model('Event', eventSchema);

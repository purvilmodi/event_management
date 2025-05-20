const mongoose = require("mongoose");

const recentEventSchema = new mongoose.Schema({
  title: String,
  description: String,
  mainImage: String,
  eventDate: Date,
  place: String,
  media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
});

module.exports = mongoose.model("RecentEvent", recentEventSchema);

const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "RecentEvent", required: true },
  type: { type: String, enum: ["image", "video"], required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Media", mediaSchema);

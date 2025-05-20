const Event = require('../models/event');
const Media = require('../models/media');
const RecentEvent = require('../models/recentEvent'); 

// Function to move expired events to Recent Events
const moveExpiredEvents = async () => {
  try {
    const now = new Date();

    // Find expired events
    const expiredEvents = await Event.find({ eventDate: { $lt: now } });

    // Move expired events to Recent Events
    for (const event of expiredEvents) {
      const newRecentEvent = new RecentEvent({
        title: event.title,
        description: event.description,
        mainImage: event.mainImage,
        eventDate: event.eventDate,
        place: event.place,
        media: event.media || [],
      });

      await newRecentEvent.save();
      await Event.findByIdAndDelete(event._id); 
    }
  } catch (error) {
    console.error('Error moving expired events:', error);
  }
};

// Run the function every 5 minutes
setInterval(moveExpiredEvents, 5 * 60 * 1000); // Runs every 5 minutes

const addEvent = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Uploaded File:", req.file); 
    const { title, description, eventDate, place } = req.body;
    const mainImage = req.file ? req.file.path : null;

    if (!title || !description || !eventDate || !place || !mainImage) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newEvent = new Event({ title, description, eventDate, place, mainImage });
    await newEvent.save();

    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const addMedia = async (req, res) => {
  try {
    const { eventId, type } = req.body;
    const url = req.file ? req.file.path : null;

    const newMedia = new Media({ eventId, type, url });
    await newMedia.save();

    res.status(201).json({ success: true, media: newMedia });
  } catch (error) {
    console.error("Error adding media:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ eventDate: { $gte: now } }).populate('media');
    res.json(events);
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const getRecentEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await RecentEvent.find({ eventDate: { $lt: now } }).populate('media');
    res.json(events);
  } catch (error) {
    console.error("Error fetching recent events:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Update Event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (req.file) {
      updatedData.mainImage = req.file.path; 
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Error updating event" });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
};
const fs = require("fs");
const path = require("path");

// Add Media to an Event
const addMediaToEvent = async (req, res) => {
  try {
    const { eventId, type } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!eventId || !type || !filePath) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newMedia = new Media({ eventId, type, url: filePath });
    await newMedia.save();

    // Update event to include the new media
    await RecentEvent.findByIdAndUpdate(eventId, { $push: { media: newMedia._id } });

    res.status(201).json({ success: true, media: newMedia });
  } catch (error) {
    console.error("Error adding media:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Media from an Event
const deleteMedia = async (req, res) => {
  try {
    const { mediaId } = req.params;

    const media = await Media.findById(mediaId);
    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    // Delete media file from uploads folder
    fs.unlink(path.join(__dirname, "..", media.url), (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    // Remove from database
    await Media.findByIdAndDelete(mediaId);
    await RecentEvent.findByIdAndUpdate(media.eventId, { $pull: { media: mediaId } });

    res.status(200).json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  moveExpiredEvents,
  addEvent,
  addMedia,
  getUpcomingEvents,
  getRecentEvents,
  updateEvent,
  deleteEvent,
  addMediaToEvent,
  deleteMedia
};

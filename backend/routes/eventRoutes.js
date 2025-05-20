const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addEvent, getUpcomingEvents, updateEvent, deleteEvent, getRecentEvents } = require("../controllers/eventController");
const { addMediaToEvent, deleteMedia } = require("../controllers/eventController");

const upload = multer({ dest: "uploads/" });

router.post("/add-event", upload.single("mainImage"), addEvent);
router.get("/upcoming-events", getUpcomingEvents);
router.get("/recent-events", getRecentEvents);
router.put("/upcoming-events/:id", upload.single("mainImage"), updateEvent);
router.delete("/upcoming-events/:id", deleteEvent);

// New routes for media management
router.post("/add-media", upload.single("file"), addMediaToEvent);
router.delete("/delete-media/:mediaId", deleteMedia);

module.exports = router;

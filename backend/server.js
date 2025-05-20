const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bodyParser = require('body-parser');
const app = express();

const { moveExpiredEvents } = require('./controllers/eventController');

// Run expired events check on server start
moveExpiredEvents();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (if storing images locally)
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/api/blogs', blogRoutes);

app.use('/api', eventRoutes);

mongoose.connect('mongodb://localhost:27017/adminpanel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

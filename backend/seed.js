const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/adminpanel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const admin = new User({
  username: 'admin',
  password: bcrypt.hashSync('password', 8),
});

admin.save().then(() => {
  mongoose.disconnect();
});

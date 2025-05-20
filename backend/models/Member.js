const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: String,
  designation: String,
});

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;

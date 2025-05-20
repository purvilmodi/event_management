const Member = require('../models/Member');

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members' });
  }
};

exports.addMember = async (req, res) => {
  try {
    const newMember = new Member({
      name: req.body.name,
      designation: req.body.designation,
    });
    await newMember.save();
    res.json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Error adding member' });
  }
};

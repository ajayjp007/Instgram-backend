const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = Users = mongoose.model('users', UsersSchema);

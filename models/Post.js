const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
});

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: false,
  },
  imageURL: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  like: {
    type: Array,
    required: true,
  },
  uploadedDate: {
    type: String,
    required: true,
  },
  comment: {
    type: [CommentsSchema],
    required: false,
  },
  numberOfLikes: {
    type: Number,
    required: true,
  },
});

module.exports = Posts = mongoose.model('posts', PostSchema);

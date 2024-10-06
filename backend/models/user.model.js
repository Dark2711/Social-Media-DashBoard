const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  twitterId: { type: String }, // Optional: To store Twitter ID
  twitterToken: { type: String }, // Optional: To store Twitter access token
  twitterTokenSecret: { type: String }, // Optional: To store Twitter token secret
});

const User = mongoose.model('User', userSchema);

module.exports = User;

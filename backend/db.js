const mongoose = require('mongoose');
const connectDB = () => {
  // connect to database
  mongoose
    .connect(
      'mongodb+srv://admin:admin@cluster0.v3hes.mongodb.net/social-media',
    )
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log('Failed to connect to MongoDB', err);
    });
};
module.exports = connectDB;

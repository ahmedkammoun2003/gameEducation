const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true,
    enum: ['student', 'teacher'],
    default:'student'
  }
});

export const User = mongoose.model('User', userSchema);

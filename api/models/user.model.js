import mongoose from'mongoose';

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
  classes:[{
    classID:mongoose.Schema.Types.ObjectId
  }],
  type:{
    type: String,
    required: true,
    enum: ['student', 'teacher'],
    default:'student'
  }
});

export const User = mongoose.model('User', userSchema);

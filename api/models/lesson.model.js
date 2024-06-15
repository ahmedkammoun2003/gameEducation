const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [{
    options: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
          }
    }]
  }]
});

export const Lesson = mongoose.model('Lesson', lessonSchema);


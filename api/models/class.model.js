const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
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

export const Class = mongoose.model('Class', classSchema);

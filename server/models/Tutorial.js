const mongoose = require('mongoose');
//create a model, give it a name and the object of what data should look like (will be replaced by schema)
const Tutorial = mongoose.model('Tutorial', {
  title: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  author: {
    type: String,
    required: true,
    default: 'unknown',
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    trim: true
  },
  keywords: [String],
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = { Tutorial };

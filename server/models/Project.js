const mongoose = require('mongoose');


const Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  craft: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 20
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {
  Project
};
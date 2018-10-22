const mongoose = require('mongoose');

//Projects will need to be associated with a user (see _createdBy & type: mongoose.Schema.Types.ObjectId,)
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
  },
  _createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {
  Project
};

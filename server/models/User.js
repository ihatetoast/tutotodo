const mongoose = require('mongoose');
const validator = require('validator');

//unique make sure there aren't dup emails
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{value} is not a valid email address.'
    }
  },
  password: {
    type: String,
    minlength: 8,
    require: true
  },
  tokens: [
    {
      access: { type: String, required: true },
      token: { type: String, required: true }
    }
  ]
});

module.exports = {
  User
};

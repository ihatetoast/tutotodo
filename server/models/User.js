const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const UserSchema = new mongoose.Schema({
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
//override a method so that we don't send back private stuff such as tokens and pw
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  return _.pick(userObj, ['_id', 'email']);
};
//instance methods for UserSchema:
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  //get access val and token val
  const access = 'auth';
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'stevebuscemi')
    .toString();

  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => {
    return token;
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};

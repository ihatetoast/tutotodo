const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//instance methods for UserSchema:
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  return _.pick(userObj, ['_id', 'email']);
};

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
//model methods:
UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, 'stevebuscemi');
  } catch (err) {
    //do stuff
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

//middleware from mongoose:
//do this before saved
UserSchema.pre('save', function(next) {
  //access to indiv doco.
  const user = this;
  //was pw modified? prevents hashing of hash if pw not modified. don't want to hash a hash or mustache. password here is this.password
  if (user.isModified('password')) {
    //pw has been altered, so rehash
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, (err, hash) => {
        // set user.password in as hash
        user.password = hash;
        next();
      });
    });
  } else {
    //pw has not been altered so do NOT hash.
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};

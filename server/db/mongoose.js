const mongoose = require('mongoose');


// use proms instead of CBs
// use built-in promise library from Mongoose:
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/ufos");

module.exports = {
  mongoose
};
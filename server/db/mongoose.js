const mongoose = require('mongoose');


// use proms instead of CBs
// use built-in promise library from Mongoose:
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};
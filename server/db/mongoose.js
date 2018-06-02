const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//connect to db
mongoose.connect('mongodb://localhost:27017/tutotodo');

module.exports = { mongoose };

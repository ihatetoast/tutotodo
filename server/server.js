const mongoose = require('mongoose');

mongoose.Promise = global.promise;
//connect to db
mongoose.connect('mongodb://localhost:27017/tutotodo');

//create a model

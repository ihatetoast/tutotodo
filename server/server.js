const express = require('express');
const bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
// var User = require('./models/User');
// var Tutorial = require('./models/Project');

const app = express();

//MIDDLEWARE
app.use(bodyParser.json());
//CRUD

app.listen(3000, () => {
  console.log('App up and running on ', 3000);
});

//export so that it can be required in the testing file
module.exports = {
  app
};
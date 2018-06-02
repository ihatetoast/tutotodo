const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/User');
var { Tutorial } = require('./models/Tutorial');

const app = express();

//MIDDLEWARE
app.use(bodyParser.json());
//CRUD
app.post('/tutorials', (request, response) => {
  var tutorial = new Tutorial({
    title: request.body.title,
    author: request.body.author,
    description: request.body.description,
    keywords: request.body.keywords,
    completed: request.body.completed,
    completedAt: request.body.completedAt
  });
  //body from body parser
  console.log(request.body);
  tutorial.save().then(
    doc => {
      response.send(doc);
    },
    e => {
      response.status(400).send(e);
    }
  );
});

app.listen(3000, () => {
  console.log('App up and running on ', 3000);
});

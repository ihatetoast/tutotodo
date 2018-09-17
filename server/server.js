// libes
const express = require('express');
const bodyParser = require('body-parser');

// local
const {
  mongoose
} = require('./db/mongoose');
const {
  User
} = require('./models/User');
const {
  Project
} = require('./models/Project');

const app = express();

// takes json and converts to obj attaches to req obj
app.use(bodyParser.json());


/* ******************************* */
/*            POST                 */
/* ******************************* */

// @route   POST api/projects
// @desc    create a project
// @access  private (eventually)

app.post('/api/projects', (request, response) => {
  console.log("posted");
  console.log(request.body);
  const project = new Project({
    title: request.body.title,
    craft: request.body.craft,
    description: request.body.description
  });
  project.save().then((doc) => {
    response.send(doc);
  }, (err) => {
    response.status(400).send(err)
  })
});
/* ******************************* */
/*             GET                 */
/* ******************************* */

app.get('/api/projects', () => {
  console.log("got");
});








// LIST'NIN ON KXPS
app.listen(3000, () => {
  console.log("You're tuned in to KXPS FM3000. This is Wolfman Jack.");
})
require('./config/config');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
// libes
const express = require('express');
const bodyParser = require('body-parser');

// local
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/User');
const { Project } = require('./models/Project');

const app = express();
const PORT = process.env.PORT;

// takes json and converts to obj attaches to req obj
app.use(bodyParser.json());

/* ******************************* */
/*            POST                 */
/* ******************************* */

// @route   POST api/projects
// @desc    create a project
// @access  private (eventually)

app.post('/api/projects', (request, response) => {
  const project = new Project({
    title: request.body.title,
    craft: request.body.craft,
    description: request.body.description
  });
  project.save().then(
    data => {
      response.send(data);
    },
    err => {
      response.status(400).send(err);
    }
  );
});
// @route   POST api/users
// @desc    create a project
// @access  private (eventually)

app.post('/api/users', (request, response) => {
  const body = _.pick(request.body, ['email', 'password']);
  const user = new User(body);
  user
    .save()
    .then(user => {
      response.send(user);
    })
    .catch(err => {
      response.status(400).send(err);
    });
});
/* ******************************* */
/*             GET                 */
/* ******************************* */

// @route   GET api/projects
// @desc    get all projects
// @access  private (eventually)

app.get('/api/projects', (request, response) => {
  Project.find().then(
    projects => {
      //set to an obj so i can also tack on ohter info along side projects. special error codes
      response.send({ projects });
    },
    err => {
      response.status(400).send(err);
    }
  );
});
// @route   GET api/projects/:id
// @desc    get project by id
// @access  private (eventually)

app.get('/api/projects/:id', (request, response) => {
  var id = request.params.id;
  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  Project.findById(id)
    .then(project => {
      if (!project) {
        return response.status(404).send();
      }

      response.send({ project });
    })
    .catch(err => {
      response.status(400).send();
    });
});

/* ******************************* */
/*            UPDATE               */
/* ******************************* */
// @route   UPDATE api/projects/:id
// @desc    update, edit project by id
// @access  private (eventually)

app.patch('/api/projects/:id', (request, response) => {
  var id = request.params.id;

  //lodash .pick ... Creates an object composed of the picked object properties.
  // control what can be edited
  var body = _.pick(request.body, [
    'title',
    'craft',
    'description',
    'completed'
  ]);

  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }
  //handling completed:
  //  if false to true, set completed at
  // if true to false, clear completed at

  if (_.isBoolean(body.completed) && body.completed) {
    // if boolean and true
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Project.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(project => {
      if (!project) {
        return response.status(404).send();
      }

      response.send({ project });
    })
    .catch(err => {
      response.status(400).send();
    });
});

/* ******************************* */
/*            DELETE               */
/* ******************************* */
// @route   DELETE api/projects/:id
// @desc    delete project by id
// @access  private (eventually)

app.delete('/api/projects/:id', (request, response) => {
  var id = request.params.id;
  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  Project.findByIdAndRemove(id)
    .then(project => {
      if (!project) {
        return response.status(404).send();
      }

      response.send({ project });
    })
    .catch(err => {
      response.status(400).send();
    });
});

// export so i can test, sport
module.exports = {
  app
};

// LIST'NIN ON KXPS
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});

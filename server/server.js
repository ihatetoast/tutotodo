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
const { authenticate } = require('./middleware/authenticate');

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
      return user.generateAuthToken();
    })
    .then(token => {
      response.header('x-auth', token).send(user);
    })
    .catch(err => {
      response.status(400).send(err);
    });
});

// @route   POST api/users/login
// @desc    allows user to login
// @access  public

app.post('/api/users/login', (request, response) => {
  const body = _.pick(request.body, ['email', 'password']);
  //does user exist with email given:
  //user a model method (see User)

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        response.header('x-auth', token).send(user);
      });
    })
    .catch(e => {
      response.status(400).send();
    });
});

/* ******************************* */
/*             GET                 */
/* ******************************* */

// @route   GET api/users/own
// @desc    get logged in user
// @access  private

app.get('/api/users/own', authenticate, (request, response) => {
  response.send(request.user);
});

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
//authenticate from middleware stores the token
app.delete('/api/users/own/token', authenticate, (request, response) => {
  //do stuff
  //instance method we created is removeToken from user's token arr.
  request.user.removeToken(request.token).then(
    () => {
      response.status(200).send();
    },
    () => {
      response.status(400).send();
    }
  );
});
/* ******************************* */
/*          THE SHIZ               */
/* ******************************* */
// export so i can test, sport
module.exports = {
  app
};

// LIST'NIN ON KXPS
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});

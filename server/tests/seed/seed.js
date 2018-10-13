const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
//models
const { Project } = require('./../../models/Project');
const { User } = require('./../../models/User');

const projects = [
  {
    _id: new ObjectID(),
    title: 'seedProject title1',
    craft: 'seedProject craft1',
    description: 'seed Project description1'
  },
  {
    _id: new ObjectID(),
    title: 'seedProject title2',
    craft: 'seedProject craft2',
    description: 'seed Project description2',
    completed: true,
    completedAt: 666
  },
  {
    _id: new ObjectID(),
    title: 'seedProject title3',
    craft: 'seedProject craft3',
    description: 'seed Project description3'
  }
];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'passer@example.com',
    password: 'passwordPass',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId, access: 'auth' }, 'stevebuscemi')
          .toString()
      }
    ]
  },
  { _id: userTwoId, email: 'failer@example.com', password: 'passwordFail' }
];
const seedProjects = done => {
  Project.remove({})
    .then(() => {
      return Project.insertMany(projects);
    })
    .then(() => done());
};
const seedUsers = done => {
  User.remove({})
    .then(() => {
      const userOnePasses = new User(users[0]).save();
      const userTwoFails = new User(users[1]).save();

      return Promise.all([userOnePasses, userTwoFails]);
    })
    .then(() => done());
};

module.exports = { projects, users, seedProjects, seedUsers };

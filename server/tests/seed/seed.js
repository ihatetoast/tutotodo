const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
//models
const { Project } = require('./../../models/Project');
const { User } = require('./../../models/User');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const projects = [
  {
    _id: new ObjectID(),
    title: 'seedProject title1',
    craft: 'seedProject craft1',
    description: 'seed Project description1',
    _createdBy: userOneId
  },
  {
    _id: new ObjectID(),
    title: 'seedProject title2',
    craft: 'seedProject craft2',
    description: 'seed Project description2',
    completed: true,
    completedAt: 666,
    _createdBy: userTwoId
  },
  {
    _id: new ObjectID(),
    title: 'seedProject title3',
    craft: 'seedProject craft3',
    description: 'seed Project description3',
    _createdBy: userTwoId
  }
];

const users = [
  {
    _id: userOneId,
    email: 'userone@example.com',
    password: 'userOnePassword!',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'usertwo@example.com',
    password: 'userTwoPassword!',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  }
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

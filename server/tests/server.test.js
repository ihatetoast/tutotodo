const { ObjectID } = require('mongodb');

const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Project } = require('./../models/Project');
const { User } = require('./../models/User');
const { projects, users, seedProjects, seedUsers } = require('./seed/seed');
// to clear db so that test is right. must be cleared so that
// what i enter is just one and length is 1
beforeEach(seedUsers);
beforeEach(seedProjects);

describe('POST /api/projects', () => {
  //test cases
  it('should create a new project', done => {
    var title = 'test project title';
    var craft = 'test project craft';
    var description = 'test project description';
    request(app)
      .post('/api/projects')
      .send({ title, craft, description })
      .expect(200)
      .expect(response => {
        expect(response.body.title).toBe(title);
      })
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        Project.find({ title })
          .then(projects => {
            expect(projects.length).toBe(1);
            expect(projects[0].title).toBe(title);
            done();
          })
          .catch(err => done(err));
      });
  });
  it('should not create a new project if fields are invalid or empty', done => {
    request(app)
      .post('/api/projects')
      .send({})
      .expect(400)
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        Project.find()
          .then(projects => {
            expect(projects.length).toBe(3);
            done();
          })
          .catch(err => done(err));
      });
  });
});
describe('GET /api/projects', () => {
  it('should get all of the projects', done => {
    request(app)
      .get('/api/projects')
      .expect(200)
      .expect(response => {
        // console.log(response.body.data.length);
        expect(response.body.projects.length).toBe(3);
      })
      .end(done);
  });
});
//projects[0]._id is an obj, so toHexString() turns it into a string
describe('GET /api/projects/:id', () => {
  it('should get back the data for the id given', done => {
    request(app)
      .get(`/api/projects/${projects[0]._id.toHexString()}`)
      .expect(200)
      .expect(response => {
        expect(response.body.project.title).toBe(projects[0].title);
      })
      .end(done);
  });

  it('should return 404 if project not found', done => {
    //mock id that's plausible
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/api/projects/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for bad/not poss ids', done => {
    request(app)
      .get('/api/projects/666')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /api/projects/:id', () => {
  it('should get delete entry for id given', done => {
    var hexId = projects[2]._id.toHexString();
    request(app)
      .delete(`/api/projects/${hexId}`)
      .expect(200)
      .expect(response => {
        expect(response.body.project._id).toBe(hexId);
      })
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        //query to see if it exists. expect it to not exist
        Project.findById(hexId)
          .then(project => {
            expect(project).not.toBeTruthy(); //replaces .notToExist
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should return 404 if project not found', done => {
    //mock id that's plausible
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/api/projects/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for bad/not poss ids', done => {
    request(app)
      .delete('/api/projects/666')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /api/projects/:id', () => {
  it('should change project', done => {
    //get id of first
    var hexId = projects[0]._id.toHexString();
    var description = 'beep bop boop';

    request(app)
      .patch(`/api/projects/${hexId}`)
      .send({
        completed: true,
        description
      })
      .expect(200)
      .expect(response => {
        expect(response.body.project.description).toBe(description);
        expect(response.body.project.completed).toBe(true);
        expect(typeof response.body.project.completedAt).toBe('number');
      })
      .end(done);
  });
  it('should make completedAT empty if not completed', done => {
    //get id
    var hexId = projects[1]._id.toHexString();

    request(app)
      .patch(`/api/projects/${hexId}`)
      .send({
        completed: false
      })
      .expect(200)
      .expect(response => {
        expect(response.body.project.completed).toBe(false);
        expect(response.body.project.completedAt).not.toBeTruthy();
      })
      .end(done);
  });
});

describe('GET /api/users/own', () => {
  it('Should return a user if user is authenticated', done => {
    request(app)
      .get('/api/users/own')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(response => {
        expect(response.body._id).toBe(users[0]._id.toHexString());
        expect(response.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  it('Should return a 404 message if not authenticated', done => {
    request(app)
      .get('/api/users/own')
      .expect(401)
      .expect(response => {
        expect(response.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /api/users', () => {
  it('should create a new user', done => {
    const email = 'doodwiddatood@example.com';
    const password = 'tooddood9006';
    request(app)
      .post('/api/users')
      .send({
        email,
        password
      })
      .expect(200)
      .expect(response => {
        expect(response.headers['x-auth']).toBeTruthy();
        expect(response.body._id).toBeTruthy();
        expect(response.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        User.findOne({ email })
          .then(user => {
            expect(user).toBeTruthy();
            //IMPORTANT: if they're equal, then it's not been hashed
            expect(user.password).not.toBe(password);
            done();
          })
          .catch(e => done(e));
      });
  });
  it('should return validation errors if any fields are invalid', done => {
    const email = 'bademail@com';
    const password = 'ohno';
    request(app)
      .post('/api/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });
  it('should not create a user if email has already been registered.', done => {
    const email = users[0].email;
    const password = 'thiswontmatter!';
    request(app)
      .post('/api/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });
});
//2nd user from seed data { _id: userTwoId, email: 'userTwo@example.com', password: 'userTwoPassword!' }
describe('POST api/users/login', () => {
  it('should login a user and return the auth token.', done => {
    request(app)
      .post('/api/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect(response => {
        expect(response.headers['x-auth']).toBeTruthy();
      })
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id)
          .then(user => {
            //see if token is in array.
            expect(user.tokens[0]).toMatchObject({
              access: 'auth',
              token: response.headers['x-auth']
            });

            done();
          })
          .catch(e => done(e));
      });
  });
  it('should reject login is not valid.', done => {
    const email = users[1].email;
    const password = 'thiswontmatter!';
    request(app)
      .post('/api/users/login')
      .send({ email, password })
      .expect(400)
      .expect(response => {
        expect(response.headers['x-auth']).not.toBeTruthy();
      })
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id)
          .then(user => {

            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});

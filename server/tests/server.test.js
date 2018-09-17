const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Project } = require('./../models/Project');

// to clear db so that test is right. must be cleared so that
// hwat i enter is just one and length is 1

beforeEach((done) => {
    Project.remove({}).then(() => done())
})

describe('POST /api/projects', () => {
    //test cases
    it('should create a new project', (done) => {
        var title = "test project title";
        var craft = "test project craft";
        var description = "test project description"
        request(app)
            .post('/api/projects')
            .send({ title, craft, description })
            .expect(200)
            .expect((response) => {
                expect(response.body.title).toBe(title)
            })
            .end((err, response) => {
                if (err) {
                    return done(err)
                }
                Project.find().then((projects) => {
                    expect(projects.length).toBe(1);
                    expect(projects[0].title).toBe(title);
                    done()
                }).catch((err) => done(err));
            })
    });
    it('should not create a new project if fields are invalid or empty', (done) => {
        request(app)
            .post('/api/projects')
            .send({})
            .expect(400)
            .end((err, response) => {
                if (err) {
                    return done(err)
                }
                Project.find().then((projects) => {
                    expect(projects.length).toBe(0);
                    done()
                }).catch((err) => done(err));
            })
    })
})
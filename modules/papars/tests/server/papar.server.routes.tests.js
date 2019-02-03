'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Papar = mongoose.model('Papar'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  papar;

/**
 * Papar routes tests
 */
describe('Papar CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Papar
    user.save(function () {
      papar = {
        name: 'Papar name'
      };

      done();
    });
  });

  it('should be able to save a Papar if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Papar
        agent.post('/api/papars')
          .send(papar)
          .expect(200)
          .end(function (paparSaveErr, paparSaveRes) {
            // Handle Papar save error
            if (paparSaveErr) {
              return done(paparSaveErr);
            }

            // Get a list of Papars
            agent.get('/api/papars')
              .end(function (paparsGetErr, paparsGetRes) {
                // Handle Papars save error
                if (paparsGetErr) {
                  return done(paparsGetErr);
                }

                // Get Papars list
                var papars = paparsGetRes.body;

                // Set assertions
                (papars[0].user._id).should.equal(userId);
                (papars[0].name).should.match('Papar name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Papar if not logged in', function (done) {
    agent.post('/api/papars')
      .send(papar)
      .expect(403)
      .end(function (paparSaveErr, paparSaveRes) {
        // Call the assertion callback
        done(paparSaveErr);
      });
  });

  it('should not be able to save an Papar if no name is provided', function (done) {
    // Invalidate name field
    papar.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Papar
        agent.post('/api/papars')
          .send(papar)
          .expect(400)
          .end(function (paparSaveErr, paparSaveRes) {
            // Set message assertion
            (paparSaveRes.body.message).should.match('Please fill Papar name');

            // Handle Papar save error
            done(paparSaveErr);
          });
      });
  });

  it('should be able to update an Papar if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Papar
        agent.post('/api/papars')
          .send(papar)
          .expect(200)
          .end(function (paparSaveErr, paparSaveRes) {
            // Handle Papar save error
            if (paparSaveErr) {
              return done(paparSaveErr);
            }

            // Update Papar name
            papar.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Papar
            agent.put('/api/papars/' + paparSaveRes.body._id)
              .send(papar)
              .expect(200)
              .end(function (paparUpdateErr, paparUpdateRes) {
                // Handle Papar update error
                if (paparUpdateErr) {
                  return done(paparUpdateErr);
                }

                // Set assertions
                (paparUpdateRes.body._id).should.equal(paparSaveRes.body._id);
                (paparUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Papars if not signed in', function (done) {
    // Create new Papar model instance
    var paparObj = new Papar(papar);

    // Save the papar
    paparObj.save(function () {
      // Request Papars
      request(app).get('/api/papars')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Papar if not signed in', function (done) {
    // Create new Papar model instance
    var paparObj = new Papar(papar);

    // Save the Papar
    paparObj.save(function () {
      request(app).get('/api/papars/' + paparObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', papar.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Papar with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/papars/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Papar is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Papar which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Papar
    request(app).get('/api/papars/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Papar with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Papar if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Papar
        agent.post('/api/papars')
          .send(papar)
          .expect(200)
          .end(function (paparSaveErr, paparSaveRes) {
            // Handle Papar save error
            if (paparSaveErr) {
              return done(paparSaveErr);
            }

            // Delete an existing Papar
            agent.delete('/api/papars/' + paparSaveRes.body._id)
              .send(papar)
              .expect(200)
              .end(function (paparDeleteErr, paparDeleteRes) {
                // Handle papar error error
                if (paparDeleteErr) {
                  return done(paparDeleteErr);
                }

                // Set assertions
                (paparDeleteRes.body._id).should.equal(paparSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Papar if not signed in', function (done) {
    // Set Papar user
    papar.user = user;

    // Create new Papar model instance
    var paparObj = new Papar(papar);

    // Save the Papar
    paparObj.save(function () {
      // Try deleting Papar
      request(app).delete('/api/papars/' + paparObj._id)
        .expect(403)
        .end(function (paparDeleteErr, paparDeleteRes) {
          // Set message assertion
          (paparDeleteRes.body.message).should.match('User is not authorized');

          // Handle Papar error error
          done(paparDeleteErr);
        });

    });
  });

  it('should be able to get a single Papar that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Papar
          agent.post('/api/papars')
            .send(papar)
            .expect(200)
            .end(function (paparSaveErr, paparSaveRes) {
              // Handle Papar save error
              if (paparSaveErr) {
                return done(paparSaveErr);
              }

              // Set assertions on new Papar
              (paparSaveRes.body.name).should.equal(papar.name);
              should.exist(paparSaveRes.body.user);
              should.equal(paparSaveRes.body.user._id, orphanId);

              // force the Papar to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Papar
                    agent.get('/api/papars/' + paparSaveRes.body._id)
                      .expect(200)
                      .end(function (paparInfoErr, paparInfoRes) {
                        // Handle Papar error
                        if (paparInfoErr) {
                          return done(paparInfoErr);
                        }

                        // Set assertions
                        (paparInfoRes.body._id).should.equal(paparSaveRes.body._id);
                        (paparInfoRes.body.name).should.equal(papar.name);
                        should.equal(paparInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Papar.remove().exec(done);
    });
  });
});

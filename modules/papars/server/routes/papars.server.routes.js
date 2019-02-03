'use strict';

/**
 * Module dependencies
 */
var paparsPolicy = require('../policies/papars.server.policy'),
  papars = require('../controllers/papars.server.controller');

module.exports = function(app) {
  // Papars Routes
  app.route('/api/papars').all(paparsPolicy.isAllowed)
    .get(papars.list)
    .post(papars.create);

  app.route('/api/papars/:paparId').all(paparsPolicy.isAllowed)
    .get(papars.read)
    .put(papars.update)
    .delete(papars.delete);

  // Finish by binding the Papar middleware
  app.param('paparId', papars.paparByID);
};

'use strict';

/**
 * Module dependencies
 */
var paperTemplatesPolicy = require('../policies/paperTemplates.server.policy'),
  paperTemplates = require('../controllers/paperTemplates.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/paperTemplates').all(paperTemplatesPolicy.isAllowed)
    .get(paperTemplates.list)
    .post(paperTemplates.create);

  // Single article routes
  app.route('/api/articles/:paperTemplateId').all(paperTemplatesPolicy.isAllowed)
    .get(paperTemplates.read)
    .put(paperTemplates.update)
    .delete(paperTemplates.delete);

  // Finish by binding the article middleware
  app.param('paperTemplateId', paperTemplates.paperTemplateByID);
};

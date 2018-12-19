'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  PaperTemplate = mongoose.model('PaperTemplate'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  var paperTemplate = new PaperTemplate(req.body);
  paperTemplate.userId = req.user._id;

  paperTemplate.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(paperTemplate);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var paperTemplate = req.paperTemplate ? req.paperTemplate.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  paperTemplate.isCurrentUserOwner = !!(req.user && paperTemplate.userId === req.user._id.toString());

  res.json(paperTemplate);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var paperTemplate = req.paperTemplate;

  paperTemplate.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(paperTemplate);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var paperTemplate = req.paperTemplate;

  paperTemplate.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(paperTemplate);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  PaperTemplate.find().sort('-created').populate('user', 'displayName').exec(function (err, paperTemplate) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(paperTemplate);
    }
  });
};

/**
 * Article middleware
 */
exports.paperTemplateByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'PaperTemplate is invalid'
    });
  }

  PaperTemplate.findById(id).populate('user', 'displayName').exec(function (err, paperTemplate) {
    if (err) {
      return next(err);
    } else if (!paperTemplate) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.paperTemplate = paperTemplate;
    next();
  });
};

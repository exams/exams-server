'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Paper = mongoose.model('Paper'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Paper
 */
exports.create = function(req, res) {
  var paper = new Paper(req.body);
  paper.user = req.user;

  paper.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(paper);
    }
  });
};

/**
 * Show the current Paper
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var paper = req.paper ? req.paper.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  paper.isCurrentUserOwner = req.user && paper.user && paper.user._id.toString() === req.user._id.toString();

  res.jsonp(paper);
};

/**
 * Update a Paper
 */
exports.update = function(req, res) {
  var paper = req.paper;

  paper = _.extend(paper, req.body);

  paper.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(paper);
    }
  });
};

/**
 * Delete an Paper
 */
exports.delete = function(req, res) {
  var paper = req.paper;

  paper.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(paper);
    }
  });
};

/**
 * List of Papers
 */
exports.list = function(req, res) {
  Paper.find().sort('-created').populate('user', 'displayName').exec(function(err, papers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(papers);
    }
  });
};

/**
 * Paper middleware
 */
exports.paperByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Paper is invalid'
    });
  }

  Paper.findById(id).populate('user', 'displayName').exec(function (err, paper) {
    if (err) {
      return next(err);
    } else if (!paper) {
      return res.status(404).send({
        message: 'No Paper with that identifier has been found'
      });
    }
    req.paper = paper;
    next();
  });
};

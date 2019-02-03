'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Papar = mongoose.model('Papar'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Papar
 */
exports.create = function(req, res) {
  var papar = new Papar(req.body);
  papar.user = req.user;

  papar.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(papar);
    }
  });
};

/**
 * Show the current Papar
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var papar = req.papar ? req.papar.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  papar.isCurrentUserOwner = req.user && papar.user && papar.user._id.toString() === req.user._id.toString();

  res.jsonp(papar);
};

/**
 * Update a Papar
 */
exports.update = function(req, res) {
  var papar = req.papar;

  papar = _.extend(papar, req.body);

  papar.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(papar);
    }
  });
};

/**
 * Delete an Papar
 */
exports.delete = function(req, res) {
  var papar = req.papar;

  papar.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(papar);
    }
  });
};

/**
 * List of Papars
 */
exports.list = function(req, res) {
  Papar.find().sort('-created').populate('user', 'displayName').exec(function(err, papars) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(papars);
    }
  });
};

/**
 * Papar middleware
 */
exports.paparByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Papar is invalid'
    });
  }

  Papar.findById(id).populate('user', 'displayName').exec(function (err, papar) {
    if (err) {
      return next(err);
    } else if (!papar) {
      return res.status(404).send({
        message: 'No Papar with that identifier has been found'
      });
    }
    req.papar = papar;
    next();
  });
};

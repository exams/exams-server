'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Paper = mongoose.model('Paper'),
  Singlechoice = mongoose.model('Singlechoice'),
  Multichoice = mongoose.model('Multichoice'),
  Questanswer = mongoose.model('Questanswer'),
  Blank = mongoose.model('Blank'),
  Judge = mongoose.model('Judge'),
  Mixing = mongoose.model('Mixing'),

  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');


var querySingleChoice = function(questsSet){
  var query= {random: {$near: [Math.random().toFixed(2), Math.random().toFixed(2)]}};
  var tags = questsSet.tags;
  if (tags.length >  0){
    query.tags = {"$all": tags};
  }
  Singlechoice.find(query).limit(questsSet.number).exec(function(err, singlechoices) {
    if (err) {
      console.log(err);
    } else {
      questsSet.questions = singlechoices;
    }
  });
}

var queryMultiChoice = function(questsSet){
  var query= {random: {$near: [Math.random().toFixed(2), Math.random().toFixed(2)]}};
  var tags = questsSet.tags;
  if (tags.length >  0){
    query.tags = {"$all": tags};
  }
  Multichoice.find(query).limit(questsSet.number).exec(function(err, multichoices) {
    if (err) {
      console.log(err);
    } else {
      questsSet.questions = multichoices;
    }
  });
}

var queryBlank = function(questsSet){
  var query= {random: {$near: [Math.random().toFixed(2), Math.random().toFixed(2)]}};
  var tags = questsSet.tags;
  if (tags.length >  0){
    query.tags = {"$all": tags};
  }
  Blank.find(query).limit(questsSet.number).exec(function(err, blanks) {
    if (err) {
      console.log(err);
    } else {
      questsSet.questions = blanks;
    }
  });
}

var queryeJudge = function(questsSet){
  var query= {random: {$near: [Math.random().toFixed(2), Math.random().toFixed(2)]}};
  var tags = questsSet.tags;
  if (tags.length >  0){
    query.tags = {"$all": tags};
  }
  Judge.find(query).limit(questsSet.number).exec(function(err, judges) {
    if (err) {
      console.log(err);
    } else {
      questsSet.questions = judges;
    }
  });
}

var queryQuestAnswer = function(questsSet){
  var query= {random: {$near: [Math.random().toFixed(2), Math.random().toFixed(2)]}};
  var tags = questsSet.tags;
  if (tags.length >  0){
    query.tags = {"$all": tags};
  }
  Questanswer.find(query).limit(questsSet.number).exec(function(err, questanswers) {
    if (err) {
      console.log(err);
    } else {
      questsSet.questions = questanswers;
    }
  });
}

var queryMixing = function(questsSet){
  var query= {random: {$near: [Math.random().toFixed(2), Math.random().toFixed(2)]}};
  var tags = questsSet.tags;
  if (tags.length >  0){
    query.tags = {"$all": tags};
  }
  Mixing.find(query).limit(questsSet.number).exec(function(err, mixings) {
    if (err) {
      console.log(err);
    } else {
      questsSet.questions = mixings;
    }
  });
}
/**
 * Create a Paper
 */
exports.create = function(req, res) {
  var template = req.body;
  var paper = new Paper();
  paper.title = template.title;
  paper.subject = template.subject;
  paper.user = req.user;

  var paperStructs = template.paperStructs;

  var questions = [];
  for(var index in paperStructs) {
    var questsSet = paperStructs[index];

    if (questsSet.questType === 'singleChoice'){
      querySingleChoice(questsSet);
    } else if (questsSet.questType === 'multiChoice'){
      queryMultiChoice(questsSet);
    } else if (questsSet.questType === 'blank'){
      queryBlank(questsSet);
    } else if (questsSet.questType === 'judge'){
      queryeJudge(questsSet);
    } else if (questsSet.questType === 'questAnswer'){
      queryQuestAnswer(questsSet);
    } else if (questsSet.questType === 'mixing'){
      queryMixing(questsSet);
    }

    questions.push(questsSet);
  }
  paper.questions = questions;

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

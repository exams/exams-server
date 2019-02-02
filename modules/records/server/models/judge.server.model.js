'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Judge Schema
 */
var JudgeSchema = new Schema({
  stem: {
    type: String,
    required: 'Please fill Judge stem'
  },
  difficulty: {
    type: Number,
    default: 4,
    min: 0,
    max: 5
  },
  description: {
    type: String
  },
  answer: {
    type: String,
    required: true
  },
  subject: {
    type: Schema.ObjectId,
    ref: 'Subject'
  },
  analysis: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Judge', JudgeSchema);

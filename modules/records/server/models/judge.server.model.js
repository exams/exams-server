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
  name: {
    type: String,
    default: '',
    required: 'Please fill Judge name',
    trim: true
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

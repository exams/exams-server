'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Blank Schema
 */
var BlankSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Blank name',
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

mongoose.model('Blank', BlankSchema);

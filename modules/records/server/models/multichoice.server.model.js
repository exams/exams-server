'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Multichoice Schema
 */
var MultichoiceSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Multichoice name',
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

mongoose.model('Multichoice', MultichoiceSchema);

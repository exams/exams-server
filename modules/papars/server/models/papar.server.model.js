'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Papar Schema
 */
var PaparSchema = new Schema({
  title: {
    type: String,
    required: 'Please fill Papar title',
  },
  subject: {
    type: Schema.ObjectId,
    ref: 'Subject'
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

mongoose.model('Papar', PaparSchema);

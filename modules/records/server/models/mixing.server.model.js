'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Mixing Schema
 */
var MixingSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Mixing name',
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

mongoose.model('Mixing', MixingSchema);

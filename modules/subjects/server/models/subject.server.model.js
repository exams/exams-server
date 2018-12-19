'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Subject Schema
 */
var SubjectSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill Subject name'
  },
  key: {
    type: String,
    required: 'Please fill the key for Subject'
  }
});

mongoose.model('Subject', SubjectSchema);

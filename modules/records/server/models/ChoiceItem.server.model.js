'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * ChoiceItem Schema
 */
var ChoiceItemSchema = new Schema({
  label: {
    type: String,
    required: 'Please fill ChoiceItem label',
    trim: true,
    upper: true
  },
  title: {
    type: String,
    required: 'Please fill ChoiceItem title'
  }
});

mongoose.model('ChoiceItem', ChoiceItemSchema);

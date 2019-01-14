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
  stem: {
    type: String,
    required: 'Please fill Multichoice stem'
  },
  // 年级
  grade: {
    type: Number
  },
  trainPeriod: {
    type: String,
    enum: ['Primary', 'Junior', 'Senior', 'Master'] //小学, 初中, 高中, 大学
  },
  isReal: {
    type: Boolean,
    default: false
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
  choiceItems: {
    type: Array,
    required: true
  },
  answer: {
    type: Array,
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

mongoose.model('Multichoice', MultichoiceSchema);

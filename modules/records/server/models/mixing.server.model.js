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
  stem: {
    type: String,
    required: 'Please fill Mixing stem',
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
  subject: {
    type: Schema.ObjectId,
    ref: 'Subject'
  },
  subQuests: {
    type: Array,
    required: 'Please add one question',
  },
  tags: {
    type: Array,
    required: 'Please add one tags',
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

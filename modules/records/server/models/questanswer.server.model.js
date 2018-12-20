'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Questanswer Schema
 */
var QuestanswerSchema = new Schema({
  title: {
    type: String,
    required: 'Please fill Questanswer title'
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
  date: {
    type: Number,
    required: function() {
      return this.isReal;
    }
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
  isMixSub: {
    type: Boolean,
    default: false
  },
  mixing: {
    type: Schema.ObjectId,
    ref: 'Mixing',
    required: function() {
      return this.isMixSub;
    }
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

mongoose.model('Questanswer', QuestanswerSchema);

'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 * PaperTemplate Schema
 */
var PaperTemplateSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Title cannot be blank'
  },
  subject: {
    type: String
  },
  difficultly: {
    type: Number,
    default: 5
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  trainPeriod: {
    type: String
  },
  grade: {
    type: Number
  },
  score: {
    type: Number
  },
  created: {
    type: Date,
    default: Date.now
  },
  paperStructs: {
    type: Array
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

PaperTemplateSchema.statics.seed = seed;

mongoose.model('PaperTemplate', PaperTemplateSchema);

/**
* Seeds the User collection with document (Article)
* and provided options.
*/
function seed(doc, options) {
  var Article = mongoose.model('Article');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(findAdminUser)
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function findAdminUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['admin'] }
          })
          .exec(function (err, admin) {
            if (err) {
              return reject(err);
            }

            doc.user = admin;

            return resolve();
          });
      });
    }

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Article
          .findOne({
            title: doc.title
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Article (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Article\t' + doc.title + ' skipped')
          });
        }

        var article = new Article(doc);

        article.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Article\t' + article.title + ' added'
          });
        });
      });
    }
  });
}

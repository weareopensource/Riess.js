'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
// validator = require('validator');
mongoose.Promise = Promise;

/**
 * User Schema
 */
const UserSchema = new Schema({
  sub: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    default: ''
  },
  username: {
    type: String,
    required: 'Please fill in a username',
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  profileImageURL: {
    type: String,
    default: 'assets/ic_profile.png'
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = (password) => {
  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = (username, suffix, callback) => {
  const _this = this;
  const possibleUsername = username.toLowerCase() + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, (err, user) => {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

UserSchema.static('findOneOrCreate', async (condition, doc) => {
  const one = await this.findOne(condition);
  return one || this.create(doc).then(doc => {
    console.log('docteur', doc);
    return doc;
  }).catch((err) => {
    console.log(err);
    return Promise.resolve(doc);
  });
});

mongoose.model('User', UserSchema);

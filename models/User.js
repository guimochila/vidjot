const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;
const { Schema } = mongoose;

// Create Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: 'Please, provide your name',
  },
  email: {
    type: String,
    required: 'Please, provide password.',
  },
  registeredAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);

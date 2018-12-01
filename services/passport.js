const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // we only care about the .Strategy portion of this module;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//set up passport to use Google strategy -> generic register which takes a Strategy as an input

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    },
  ),
);

//creates a new instance of the Google passport strategy

/* Passport uses an internal string called 'google' to identify itself. 
Which is how passport knows how to involve the proper strategy with the 'google' string
google has a list of different scopes [profile, email ] are part of that scope.
*/

const Koa = require('koa');
const passport = require('passport');
const Router = require('koa-router');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = new Koa();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Access token:', accessToken);
      console.log('Refresh Token', refreshToken);
      console.log('profile', profile);
    },
  ),
);

//configure routes

const router = new Router();

router
  .get(
    '/auth/google/',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  )
  .get('/auth/google/callback', passport.authenticate('google'));

app.use(router.routes()).use(router.allowedMethods());

// dynamically configure PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);

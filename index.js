//ENTRYPOINT
/* Server side will use commonjs modules */
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

//initialize app
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);
//set up cookie session

app.use(passport.initialize()); //tell passport to use cookies
app.use(passport.session()); //start the session

require('./routes/authRoutes')(app);

// configure dynamic ports
const PORT = process.env.PORT || 5000;
app.listen(PORT);

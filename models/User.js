const mongoose = require('mongoose');
const { Schema } = mongoose; //ES2015 Destructuring allows this format

const userSchema = new Schema({
  googleId: String,
});

mongoose.model('users', userSchema);

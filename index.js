//ENTRYPOINT
/* Server side will use commonjs modules */

const express = require('express');

const app = express(); // single app object for this project

//configure routes

app.get('/', (req, res) => {
  res.send({ hi: 'there' }); // General Kenobi
});

// tell the app to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);

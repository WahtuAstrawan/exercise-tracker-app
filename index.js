const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rateLimiter = require("./config/rateLimiter");
const apiKeyChecker = require("./config/apiKeyChecker");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(rateLimiter);
app.use(apiKeyChecker);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

const userRouter = require('./routes/users');

app.use('/api/users', userRouter);

module.exports = app;
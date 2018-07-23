const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./account/user');

const app = express();

const port = process.env.port || 5000;

const db = require('./config/keys').mongoURI;

// Load User model
const User = require('./models/User.js');

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use(express.static("views"));

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.render('index.ejs');
});

app.use('/account/users', users);

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
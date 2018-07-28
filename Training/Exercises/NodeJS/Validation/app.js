const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

const port = process.env.port || 5000;

const db = require('./config/keys').mongoURI;

// Load User model
const User = require('./models/User.js');

const validateUser = require('./validation/user');

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

app.post("/", function (req, res) {

    const {
        errors,
        isValid
    } = validateUser(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newUser = new User({
        name: req.body.name,
        password: req.body.name
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
        });
    });

    res.redirect("/login");
});

app.get("/login", function (req, res) {
    res.render("login.ejs");
});

app.post("/login", function (req, res) {

    const {
        errors,
        isValid
    } = validateUser(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        name: req.body.name
    }).then(user => {
        // Check for user
        if (!user) {
            errors.name = 'User not found';
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = {
                    name: user.name,
                }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey, {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});

app.get("/user/:id",
    passport.authenticate('jwt', {
        session: false
    }),
    function (req, res) {
        res.render("user.ejs", {
            id: req.params.id,
        });
    })

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
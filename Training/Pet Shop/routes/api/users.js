const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");
const passport = require("passport");

const router = express.Router();

// Load User model
const User = require("../../models/User");

// Load Input Validation
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")

/*
    @route    GET api/users/test
    @desc     Test users route
    @access   Public
*/
router.get("/test", (req, res) => res.json({
    msg: "Users Works"
}));

/*
    @route    GET api/users/register
    @desc     Register user
    @access   Public
*/
router.post("/register", (req, res) => {

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid)  {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            errors.Email = "Email alreay exists";
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                FirstName: req.body.firstname,
                LastName: req.body.lastname,
                User: req.body.user,
                Phone: req.body.phone,
                Email: req.body.email,
                Password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.Password, salt, (err, hash) =>  {
                    newUser.Password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                })
            });

        }
    });
});

/*
    @route    POST api/users/login
    @desc     Login user / Returning JWT Token
    @access   Public
*/
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const {
        errors,
        isValid
    } = validateLOGINInput(req.body);

    if (!isValid)  {
        return res.status(400).json(errors);
    }

    // Find user by email
    User.findOne({
        Email: email
    }).then(user =>  {
        if (!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
        }
        // Check Password
        bcrypt.compare(password, user.Password).then(isMatch =>  {
            if (isMatch) {
                // User Matched
                const payload = {
                    id: user.id,
                    email: user.Email
                };

                // Sign the Token
                jwt.sign(payload, keys.secretOrKey, {
                    expiresIn: 3600
                }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                });

            } else {
                errors.password = "Password incorrect";
                return res.status(400).json(errors);
            }
        });
    });
});

/*
    @route    GET api/users/current
    @desc     Return the current user
    @access   Private
*/
router.get("/current", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.Email
    });
});

module.exports = router;
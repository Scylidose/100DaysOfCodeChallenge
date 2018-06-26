const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Post = require("../../models/Post");


const validatePostInput = require("../../validation/post");

/*
    @route    GET api/posts/test
    @desc     Test posts route
    @access   Public
*/
router.get("/test", (req, res) => res.json({
    msg: "Posts Works"
}));

/*
    @route    POST api/posts
    @desc     Create post
    @access   Private
*/
router.post("/", passport.authenticate("jwt", { session: false}), (req, res) => {
    
    const { errors, isValid } = validatePostInput(req.body);

    if(!usValid){
        return res.status(400).json(errors);
    }
    
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

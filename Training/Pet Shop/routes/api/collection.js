const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Collection model
const Collection = require('../../models/Collection');


// @route   GET api/collection/:id
// @desc    Get collection by id
// @access  Public
router.get('/:id', (req, res) => {
    Collection.findById(req.params.id)
        .then(collection => res.json(collection))
        .catch(err => res.status(404).json({
            nopostsfound: 'No Collection found with that ID'
        }));
});


module.exports = router;

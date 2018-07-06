const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    alert("textt");
    res.render("register.ejs");
});

module.exports = router;
const express = require("express");
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static("views"));

app.get("/", function (req, res){
    res.render('index.ejs');
});

app.get("/about", function (req, res){
    res.render('about.ejs');
});

const port = process.env.port || 5000;

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});
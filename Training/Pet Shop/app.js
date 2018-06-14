var express = require("express");
var app = express();

const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("accueil.ejs", {utilisateur:"None"});
});

app.get("/animaux/page/:page_id", function(req, res){
    res.render("animaux.ejs");
});

app.get("/login", function(req, res){
    res.render("user.ejs");
});

app.listen(port , function(){
    console.log("Server is listening on port "+port);
});
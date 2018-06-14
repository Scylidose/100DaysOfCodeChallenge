var express = require("express");
var app = express();

const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

// Home Page

app.get("/", function(req, res){
    res.render("templates/accueil.ejs", {utilisateur:"None"});
});

// Login and Register Page

app.get("/login", function(req, res){
    res.render("templates/user.ejs");
});

app.get("/enregistrer", function(req, res){
    res.render("templates/enregistrer.ejs", {error:""});
});

// Animals Page 

app.get("/animaux/page/:page_id", function(req, res){
    res.render("templates/animal.ejs");
});

app.get("/animaux", function(req, res){
    res.render("templates/animaux.ejs");
});

// Adoption Page

app.get("/adoption", function(req, res){
    res.render("templates/adoption.ejs");
});

app.listen(port , function(){
    console.log("Server is listening on port "+port);
});
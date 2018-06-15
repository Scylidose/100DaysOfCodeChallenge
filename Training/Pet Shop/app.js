var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
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

app.post("/register", function(req, res){
    var destination = req.body.courriel;
    var courriel2 = req.body.courriel2;
    var utilisateur = req.body.username;

    var password = req.body.password;

    utilisateur = req.body.username;
    destination = req.body.courriel;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var telephone = req.body.telephone;
    var adresse = req.body.adresse;

    res.redirect("/confirmer");
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
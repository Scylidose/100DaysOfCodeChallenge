var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Home Page

app.get("/", function(req, res){
    res.render("templates/accueil.ejs", {utilisateur:"None", error:""});
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

    if(utilisateur != "None"){
        res.render("templates/enregistrer.ejs", {error:"Erreur: Nom d'utilisateur déjà pris"});
    }

    if(destination != courriel2){
        res.render("templates/enregistrer.ejs", {error:"Erreur: Les courriels sont différents"});
    }

    if(destination != "None"){
        res.render("templates/enregistrer.ejs", {error:"Erreur: Adresse courriel déjà prise"});
    }

    var password = req.body.password;

    utilisateur = req.body.username;
    destination = req.body.courriel;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var telephone = req.body.telephone;
    var adresse = req.body.adresse;

    if(nom == "" || prenom == "" || utilisateur == "" || telephone == "" || destination == "" || courriel2 == "" || password == "" || adresse == ""){
        res.render("templates/enregistrer.ejs", {error:"Erreur: Certains champs sont vides"});
    }
    
    var verif_courriel = true;

    if(destination.indexOf('@') <= -1){
        verif_courriel = false;
    }

    if(!verif_courriel){
        res.render("templates/enregistrer.ejs", {error:"Erreur: Le champ du courriel invalide"});
    }

    var verif_telephone = false;

    if(telephone.match(/^[0-9]+$/) != null){
        verif_telephone = true;
    }

    if(!verif_telephone){
        res.render("templates/enregistrer.ejs", {error:"Erreur: Le champ du téléphone invalide"});
    }

    res.redirect("/confirmer");
});

app.get("/confirmer", function(req, res){
    res.render("templates/confirmer.ejs", {param:"confirm"});
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
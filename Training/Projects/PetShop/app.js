const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const pokemonGif = require('pokemon-gif');
const pokemon = require('pokemon');

const keys = require('./config/keys');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const User = require('./models/User');
const pokeCollection = require('./models/Collection');
const PokemonDB = require('./models/Pokemon');

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.get("/", function (req, res) {
    res.render('accueil', {
        utilisateur: false
    });
});

app.post("/register", function (req, res) {
    var username = req.body.username;
    var courriel = req.body.courriel;
    var password = req.body.password;

    const newUser = new User({
        username: username,
        courriel: courriel,
        password: password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
        });
    });

    const payload = {
        id: username
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

    const newPokeCollection = new pokeCollection({
        username: username,
        Pokemon: ['']
    });

    for (var i = 0; i < 2; i++) {
        var id = genPokemon();
        var newPoke = {
            Pokemon: id
        }

        createPokemon(username, id);

        newPokeCollection.Pokemons.unshift(newPoke);
    }

    newPokeCollection.save();
    newUser.save()

    res.redirect('/user/' + username);
});

app.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username
    }).then(user =>  {
        if (!user) {
            return res.status(404).json('User not found');
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = {
                    id: username
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
                res.redirect('/user/' + username);
            } else {
                return res.status(400).json('Password incorrect');
            }
        });
    })
});

app.post("/search", function (req, res) {
    var results = [];

    var search = req.body.search;

    PokemonDB.find({
        name: search
    }).then(pokemons => {
        if (!pokemons) {
            return res.status(400).json("Pokemon not found.");
        }

        res.render("results", {
            resultList: pokemons
        });
    })
});

app.get("/user/:username", function (req, res) {
    var pokeColl = [];
    var pokeCollGif = [];

    pokeCollection.findOne({
        username: req.params.username
    }).then(coll => {
        for (var i = 0; i < coll.Pokemons.length; i++) {
            pokeColl.unshift(pokemon.getName(coll.Pokemons[i].Pokemon));
            pokeCollGif.unshift(pokemonGif(coll.Pokemons[i].Pokemon));
        }
        res.render("user", {
            username: req.params.username,
            pokemonsGif: pokeCollGif,
            pokemons: pokeColl
        });
    })
});

function genPokemon() {
    return Math.floor(Math.random() * (151 - 1 + 1)) + 1;
}

function createPokemon(username, id){
    PokemonDB.findOne({
        name: pokemon.getName(id)
    }).then(pokemons => {

        var newUsername = {
            user: username
        }

        if (!pokemons)  {

            var newPokemon = new PokemonDB({
                user: [''],
                name: pokemon.getName(id)
            });
            newPokemon.usernames.unshift(newUsername);
            newPokemon.save();
        } else {
            pokemons.usernames.unshift(newUsername);
            pokemons.save();
        }
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const pokemonGif = require('pokemon-gif');

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
                token: `Bearer ${token}`
            });
        }
    );

    const pokeCollection = new Collection({
        username: username,
    })

    for (var i = 0; i < 2; i++) {
        var id = genPokemon();
        const newPokemon = new Pokemon({
            id: id
        });
        //pokeCollection.Pokemons.push(newPokemon);
    }
    newUser.pokeCollection = pokeCollection;

    pokeCollection.save();
    newUser.save()

    res.redirect('/user/' + username);
});

app.get("/user/:username", passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    res.render("user");
});

function genPokemon() {
    return Math.floor(Math.random() * (151 - 1 + 1)) + 1;
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
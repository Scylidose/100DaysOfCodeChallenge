const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const pokemonGif = require('pokemon-gif');
const pokemon = require('pokemon');
var cookieParser = require('cookie-parser');
var jwtDecode = require('jwt-decode');

const keys = require('./config/keys');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use(cookieParser());

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
const tradePokemon = require('./models/Trade');

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Validation 
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');

app.get("/", function (req, res) {
    var username = "";
    var token = req.cookies.jwt
    if (token) {
        username = jwtDecode(token).id
    }
    User.findOne({
        username: username
    }).then(users => {
        var user = "";
        if (users) {
            user = users.username;
        }
        res.render("accueil", {
            username: user
        })
    })
});

app.post("/register", function (req, res) {
    var username = req.body.username;
    var courriel = req.body.courriel;
    var password = req.body.password;

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        username: username
    }).then(user =>  {
        if (user) {
            return res.status(400).json('User already exist');
        }
    });

    User.findOne({
        courriel: courriel
    }).then(user =>  {
        if (user) {
            return res.status(400).json('Courriel already exist');
        }
    });

    User.find({}, function (err, users) {
        users.forEach(function (user) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    return res.status(400).json('Password already exist');
                }
            });
        });
    })

    const newUser = new User({
        username: username,
        courriel: courriel,
        password: password,
    });

    const newPokeCollection = new pokeCollection({
        username: username,
        Pokemon: ['']
    });

    for (var i = 0; i < 3; i++) {
        var id = genPokemon();
        var newPoke = {
            Pokemon: id
        }

        createPokemon(username, id);

        newPokeCollection.Pokemons.unshift(newPoke);
    }

    newPokeCollection.save();

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save();
        });
    });

    const payload = {
        id: username,
    }; // Create JWT Payload

    // Sign Token
    var token = jwt.sign(
        payload,
        keys.secretOrKey, {
            expiresIn: 3600
        });

    res.cookie('jwt', token, {
        encode: String
    });

    res.redirect('/');
});

app.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        username: username
    }).then(user =>  {
        if (!user) {
            return res.status(404).json('User not found');
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: username,
                }; // Create JWT Payload

                // Sign Token
                var token = jwt.sign(
                    payload,
                    keys.secretOrKey, {
                        expiresIn: 3600
                    });

                res.cookie('jwt', token, {
                    encode: String
                });

                res.redirect('/');
            } else {
                return res.status(400).json('Password incorrect');
            }
        });
    })
});

app.get('/trade/:from/:trade/:choose', passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    var username = req.params.from;
    var fromUser = req.user.username;

    var tradeList = req.params.trade;
    var chooseList = req.params.choose;

    tradeList = tradeList.split(",");
    chooseList = chooseList.split(",");

    const newTrade = new tradePokemon({
        username: username,
        ask: tradeList,
        choose: chooseList,
        from: fromUser
    });

    newTrade.save();

    return res.redirect("/user/" + fromUser);
});

app.post("/search", function (req, res) {

    var search = req.body.search;

    PokemonDB.find({
        name: search
    }).then(pokemons => {
        if (!pokemons) {
            return res.status(400).json("Pokemon not found.");
        }

        var username = "";
        var token = req.cookies.jwt
        if (token) {
            username = jwtDecode(token).id
        }
        User.findOne({
            username: username
        }).then(users => {
            var user = "";
            if (users) {
                user = users.username;
            }
            res.render("results", {
                resultList: pokemons,
                username: user
            });
        })
    })
});

app.get("/disconnect", function (req, res) {
    res.clearCookie("jwt");
    res.redirect("/");
});

app.get('/accept/:from/:choose/:trade', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var username = req.user.username;
    var fromUser = req.params.from;
    var tradeList = [];
    var chooseList = [];

    for (var i = 0; i  < req.params.trade.split(",").length; i++) {
        tradeList.push(req.params.trade.split(",")[i]);
    }

    for (var i = 0; i  < req.params.choose.split(",").length; i++) {
        chooseList.push(req.params.choose.split(",")[i]);
    }

    tradePokemon.find({
        ask: {
            $all: tradeList
        },
        choose: {
            $all: chooseList
        },
        username: username,
        from: fromUser
    }).then(trades => {

        if (!trades) {
            res.json("An error occured.");
        }

        for (var i = 0; i < tradeList.length; i++) {
            var trading = pokemon.getId(tradeList[i].charAt(0).toUpperCase() + tradeList[i].slice(1));
            console.log(trading);

            pokeCollection.findOne({
                username: username
            }).then(coll => {
                for (var i = 0; i <  coll.Pokemons.length; i++) {
                    if (coll.Pokemons[i].Pokemon == trading) {
                        coll.Pokemons.splice(i, 1);
                    }
                }
                coll.save();
            });

            pokeCollection.findOne({
                username: fromUser
            }).then(coll => {
                var newPoke = {
                    Pokemon: trading
                }
                
                coll.Pokemons.unshift(newPoke);
                coll.save();
            });
        }

        for (var i = 0; i < chooseList.length; i++) {
            var choosing = pokemon.getId(chooseList[i].charAt(0).toUpperCase() + chooseList[i].slice(1));

            pokeCollection.findOne({
                username: fromUser
            }).then(coll => {
                for (var i = 0; i <  coll.Pokemons.length; i++) {
                    if (coll.Pokemons[i].Pokemon == choosing) {
                        coll.Pokemons.splice(i, 1);
                    }
                }
                coll.save();
            });

            pokeCollection.findOne({
                username: username
            }).then(coll => {
                var newPoke = {
                    Pokemon: choosing
                }
                
                coll.Pokemons.unshift(newPoke);
                coll.save();
            });
        }

        tradePokemon.findByIdAndRemove(trades[0]._id, function (err) {
            if (err) throw err;
        });
        return res.redirect("/user/" + username);
    })
});

app.get("/user/:username", passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var pokeColl = [];
    var pokeCollGif = [];

    var tradeList = [];
    var tradeCollection = [];

    var ask =   [];
    var choose = [];

    pokeCollection.findOne({
        username: req.params.username
    }).then(coll => {
        for (var i = 0; i < coll.Pokemons.length; i++) {
            pokeColl.unshift(pokemon.getName(coll.Pokemons[i].Pokemon));
            pokeCollGif.unshift(pokemonGif(coll.Pokemons[i].Pokemon));
        }

        tradePokemon.find({
            username: req.params.username
        }).then(trades => {
            for (var i = 0; i <  trades.length; i++) {
                for (var j = 0; j <  trades[i].ask.length; j++) {
                    ask.unshift(trades[i].ask[j]);
                }
                for (var j = 0; j <  trades[i].choose.length; j++) {
                    choose.unshift(trades[i].choose[j]);
                }
                tradeList.unshift(ask);
                tradeList.unshift(choose);
                tradeList.unshift(trades[i].from);

                tradeCollection.unshift(tradeList);

                ask = [];
                choose = [];
                tradeList = [];
            }

            res.render("user", {
                username: req.params.username,
                cookieUser: req.user.username,
                pokemonsGif: pokeCollGif,
                pokemons: pokeColl,
                trades: JSON.stringify(tradeCollection)
            });
        });
    });
});

app.get("/collection/:username", passport.authenticate('jwt', {
    session: false
}), function (req, res) {

    var user = req.params.username;
    var pokeName = [];
    var myColl = [];

    pokeCollection.findOne({
        username: user
    }).then(coll => {
        if (!coll) {
            return res.status(400).json("User not found.");
        }

        for (var i = 0; i <  coll.Pokemons.length; i++) {
            pokeName.unshift(pokemon.getName(coll.Pokemons[i].Pokemon));
        }

        pokeCollection.findOne({
            username: req.user.username
        }).then(coll => {
            for (var i = 0; i <  coll.Pokemons.length; i++) {
                myColl.unshift(pokemon.getName(coll.Pokemons[i].Pokemon));
            }

            res.render("collection", {
                username: user,
                resultList: pokeName,
                myCollection: myColl
            })
        });
    });
});

function genPokemon() {
    var id = Math.floor(Math.random() * (151 - 1 + 1)) + 1;

    if (id >= 144 && id <= 151) {
        id = Math.floor(Math.random() * (151 - 1 + 1)) + 1;
    }
    return id;
}

function createPokemon(username, id) {
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
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('../config/keys');

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};
module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = cookieExtractor; // check token in cookie
  opts.secretOrKey = keys.secretOrKey;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({
      username: jwt_payload.id
    }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
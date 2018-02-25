const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load user model
require('../models/User');
const User = mongoose.model('user');

module.exports = function (passport) {
    passport.use(new LocalStrategy((username,password, done) => {
        //Match User
        User.findOne({username: username})
            .then(user => {
            if(!user) {
                return done(null, false, {message: 'No User Found'});
            }
            //Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) {
                    req.flash('error_msg', err);
                }
                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }
            })
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
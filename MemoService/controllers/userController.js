const MODEL_PATH = '../models/';
const User = require(MODEL_PATH + 'User');
// const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.get_login_form = function(req,res) {
    res.render('user/login');
};

exports.log_user = (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/memos',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req,res,next)};

exports.logout = (req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
};

exports.register_new_user = (req,res) => {
    let errors = [];

    if (req.body.password != req.body.password2) {
        errors.push({
            text: 'passwords do not match'
        });
    }

    if (req.body.password.length < 4) {
        errors.push({
            text: 'password must have at least 4 characters'
        });
    }

    if (errors.length > 0) {
        res.render('user/register', {
            errors: errors,
            username: req.body.username,
            email: req.body.email
        });
    } else {
        //check if user with email exists
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    errors.push({
                        text: 'user with this email already exists !'
                    });
                    res.render('user/login', {errors: errors});
                } else {

                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    });

                    console.log(`password before bcrypt ${newUser.password}`);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                errors.push({
                                    text: err
                                });
                            }
                            newUser.password = hash;
                            newUser.save()
                                .then(() => {
                                    req.flash('success_msg', 'You re now registered, try to login');
                                    res.redirect('/user/login');
                                }).catch(err => {
                                errors.push({
                                    text: err
                                });
                                res.render('user/register', {errors: errors});
                            });
                        })
                    });
                }
            })
    }
};
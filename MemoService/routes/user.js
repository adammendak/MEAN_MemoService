const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Load User Model
const User = require('../models/User');

//User Login Route
router.get('/login', (req,res) => {
    res.render('user/login');
});

//Login User
router.post('/login', (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/memos',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req,res,next);
});

//Logout User
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

router.route('/register')
    .get((req,res) => {
    res.render('user/register');
    })
    .post((req,res) => {
        let errors = [];

        if(req.body.password != req.body.password2) {
            errors.push({
                text: 'passwords do not match'
            });
        }

        if(req.body.password.length < 4) {
            errors.push({
                text: 'password must have at least 4 characters'
            });
        }

        if(errors.length > 0) {
            res.render('user/register', {
                errors: errors,
                username: req.body.username,
                email: req.body.email
            });
        } else {
            //check if user with email exists
            User.findOne({email: req.body.email})
                .then(user => {
                    if(user) {
                        errors.push({
                            text: 'user with this email already exists !'
                        });
                        res.render('user/login', {errors: errors});
                    } else {

                        const newUser = new User ({
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
                                    .then(user => {
                                        req.flash('success_msg', 'You re now registered, try to login');
                                        res.redirect('/user/login');
                                        return;
                                    }).catch(err => {
                                    errors.push({
                                        text: err
                                    });
                                    res.render('user/register', {errors: errors});
                                    return;
                                });
                            })
                        });
                    }
                })
        }
    });

module.exports = router;
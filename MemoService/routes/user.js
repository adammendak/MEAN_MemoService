const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

//Load User Model
require('../models/User');
const User = mongoose.model('user');

//User login route
router.get('/login', (req,res) => {
    res.render('user/login');
});

//User register route
router.get('/register', (req,res) => {
    res.render('user/register');
});

//Register User
router.post('/register', (req,res) => {
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
            userName: req.body.userName,
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
                        userName: req.body.userName,
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
                                    req.flash('successMsg', 'You re now registered, try to login');
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
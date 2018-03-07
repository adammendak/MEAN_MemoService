const MODEL_PATH = '../models/';
const User = require(MODEL_PATH + 'User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWTSecret = require('../config/passport').JWTSecret;


exports.get_login_form = function(req,res) {
    res.render('user/login');
};

// exports.log_user = (req,res,next) => {
//     console.log("inside passport function");
//     passport.authenticate('local', {
//         successRedirect: '/memos',
//         failureRedirect: '/user/login',
//         failureFlash: true
//     })(req,res,next)};

exports.log_user = function(req,res, next) {
    console.log("inside passport login function");

    // const passport = require('passport').Passport;
    passport.authorize('local', (req,res,info) => {

        //if passport throws any error
        // if(err) {
        //     console.log("error in passport" + err.message);
        //     res.status(404).json(err);
        // }

        console.log("not in error passport function");
        //if user is found or else if no user found
        if(user){
            let token = jwt.sign(user.toJSON(), JWTSecret, {
                expiresIn: 1440 // expires in 1 hour
            });
            res.status(200);
            res.json({
                "token" : token
            })
        } else {
            res.status(401).json(info);
        }

    })(req,res,next)
};

exports.logout = (req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
};
//
// module.exports.register_new_user = (req, res) => {
//     console.log("Registering user: " + req.body.email);
//     res.status(200);
//     res.json({
//         "message" : "User registered: " + req.body.email
//     });
// };

exports.register_new_user = (req,res) => {
    console.log(req.body);

    let errors = [];

    if (req.body.password.length < 4) {
        errors.push({
            text: 'password must have at least 4 characters'
        });
    }

    console.log(errors);
    if (errors.length > 0) {
        //send error message in json
        // res.render('user/register', {
        //     errors: errors,
        //     username: req.body.username,
        //     email: req.body.email
        // });
    } else {
        //check if user with email exists
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    errors.push({
                        text: 'user with this email already exists !'
                    });
                    //send errors to front controller
                    // res.render('user/login', {errors: errors});
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
                                    let token = jwt.sign(newUser.toJSON(), JWTSecret , {
                                        expiresIn: 1440 // expires in 1 hour
                                    });
                                    res.status(201);
                                    res.json({
                                        "token": token
                                    })
                                    // req.flash('success_msg', 'You re now registered, try to login');
                                    // res.redirect('/user/login');
                                }).catch(err => {
                                errors.push({
                                    text: err
                                });
                                res.status(400);
                                res.json({
                                    "error": err.message
                                })
                                // res.render('user/register', {errors: errors});
                            });
                        })
                    });
                }
            })
    }
};
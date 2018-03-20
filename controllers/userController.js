const MODEL_PATH = '../models/';
const User = require(MODEL_PATH + 'User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWTSecret = require('../config/database').JWTSecret;


// exports.get_login_form = function(req,res) {
//     res.render('user/login');
// };

exports.log_user = (req,res, next) => {
    console.log("inside passport login function");

    User.findOne({username : req.body.username})
        .then( user => {
                if (!user) {
                    return res.status(401).json({
                        title: 'Login failed',
                        error: {message: "Invalid login credentials"}
                    });
                };
                if(!bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(401).json({
                        title: 'Login failed',
                        error: {message: "Invalid login credentials"}
                    });
                }

                const token = jwt.sign({user: user}, JWTSecret, {expiresIn: 1440});
                return res.status(200).json({
                    message: 'successfull login',
                    token: token,
                    user: user
                })
            }
        )
        .catch((err => {
            res.status(400);
            res.json({
                "error": err.message
        })
    }))
};

// exports.logout = (req,res) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/');
// };

exports.register_new_user = (req,res) => {
    console.log(req.body);

    let errors = [];

    if (req.body.password.length < 4) {
        errors.push({
            text: 'password must have at least 4 characters'
        });
    }
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                res.json({
                    title: 'User registration failed',
                    error: {message: "User already registered"}
                });

            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            res.json({
                                title: 'User registration failed',
                                error: {message: "Error with user registration"}
                            });
                        }
                        newUser.password = hash;

                        newUser.save()
                            .then(() => {
                                let token = jwt.sign(newUser.toJSON(), JWTSecret , {
                                    expiresIn: 1440
                                });
                                res.status(201);
                                res.json({
                                    "message" : "user created successfully",
                                    "token": token,
                                    "user" : newUser
                                })

                            }).catch(err => {
                                res.status(400);
                                res.json({
                                    title: 'User registration failed',
                                    error: {message: "Error with user registration"}
                                })
                            });
                    })
                });
            }
        })
};
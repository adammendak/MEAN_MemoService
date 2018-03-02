const mongoose = require('mongoose');
const sign = require("jsonwebtoken").sign;
const Schema = mongoose.Schema;
const JWTSecret = require('../config/passport').JWTSecret;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
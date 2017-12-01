const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        tupe: String,
        required: true,
        minlength : 6
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
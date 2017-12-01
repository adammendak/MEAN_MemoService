const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//I stands for iteration
const SALT_I = 10;

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
        minlength : 6,
    }
});

//pre oznacza ze zadnim zapiszemy w bazie danych to wywolujemy ta metode
userSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(SALT_I, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)

                user.password = hash;
                next();

            });
        })
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
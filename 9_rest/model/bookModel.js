const mongoose = require('mongoose');

    Schema = mongoose.Schema;

const BookModel = new Schema({
    title: String,
    author: String,
    genre: String,
    read: {type: Boolean, default: false}

});

module.exports = mongoose.model('Book', BookModel);
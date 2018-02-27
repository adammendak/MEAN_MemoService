"use strict";
const Book = require('../model/bookModel');
var bookController = function(Book) {

    var post =function(req,res) {
        var book = new Book(req.body);

        console.log(book);
        book.save();
        res.status(201).send(book);
    };

    var get = function(req,res) {

        Book.find(function(err, books) {
            if (err) {
                res.status(500).send(err);
            }
            res.json(books)
        });
    }

    return {
        post: post,
        get: get
    }
};

module.exports = bookController;
"use strict";
const express = require('express');
const Book = require('../model/bookModel');
// const mongoose = require('mongoose');


const routes = (Book) => {
    const bookRouter = express.Router();
    const bookController= require('../controllers/bookController')(Book);

    bookRouter.route('/')
        // .get((req,res) => {
        //
        //     let query = req.query;
        //
        //     Book.find(query, (err,books) => {
        //         if(err) {
        //             res.status(500).send(err);
        //         }
        //         res.json(books)
        //     })
        // })
        .get(bookController.get)
        // .post((req,res) => {
        //     let book = new Book(req.body);
        //
        //     console.log(book);
        //     book.save();
        //     res.status(201).send(book);
        // })
        .post(bookController.post());

    bookRouter.route('/:bookId')
        .all((req,res,next)=> {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else if (book) {
                    req.book = book;
                    next();
                } else {
                    res.status(404).send();
                }
            });
        })
        .all((req,res,next) => {
        console.log(req.body);
        next();
        })
        .get(function(req,res) {
        console.log(req.book);
            res.json(req.book);
        })
        .put((req,res) => {

            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .patch((req,res) => {
            if(req.body.id){
                delete req.body._id;
            }
            for (let p in req.body) {
                req.body[p] = req.book[p];
            }

            req.book.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(req.book)
                    res.json(req.book);
                }
            });
        })
        .delete((req,res) => {
            req.book.remove((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        })
    return bookRouter;
};

module.exports = routes;
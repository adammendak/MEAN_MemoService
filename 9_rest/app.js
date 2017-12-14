const express = require('express');
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/bookAPI');

const Book = require('./model/bookModel');


const port = process.env.port || 3000;

const app = express();

const bookRouter = express.Router();

bookRouter.route('/books')
    .get((req,res) => {

        let query = req.query;

        Book.find(query, (err,books) => {
            if(err) {
                res.status(500).send(err);
            }
            res.json(books)
        })
    });

bookRouter.route('/books/:bookId')
    .get((req,res) => {

        Book.findById(req.params.bookId, (err,book) => {
            if(err) {
                res.status(500).send(err);
            }
            res.json(book)
        })
    });


app.use('/api', bookRouter);





app.get('/', (req,res) => {
    res.send('hello mister sir');
});

app.listen(port, ()=> {
    console.log('app running on port ' + port)
});
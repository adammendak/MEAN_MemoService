const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const db = mongoose.connect('mongodb://localhost:27017/bookAPI');

const Book = require('./model/bookModel');

const bookRouter = require('./routes/bookRouter')(Book);


const port = process.env.port || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);


app.get('/', (req,res) => {
    res.send('hello mister sir');
});

app.listen(port, ()=> {
    console.log('app running on port ' + port)
});
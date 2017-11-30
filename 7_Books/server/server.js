const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

//DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Book_db')

const {Book} = require('./models/books')
const {Store} = require('./models/stores')



//routes
app.get('/api/stores',(req,res)=>{

    Store.find((err,doc)=>{
        if(err){
            return console.log(`error ${err}`)
        }
        res.send(doc);
    })

})

app.post('/api/add/books', (req,res)=> {

    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages,
        price: req.body.price,
        stores: req.body.stores
    });

    book.save((err,doc)=> {
        if(err) res.status(400).send();

        res.status(200).send();
    })

})


app.post('/api/add/store', (req,res) => {

    const store = new Store({
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone
    });

    store.save((err,doc) => {
       if(err) {
           res.status(400).send(err);
       }

       res.status(200).send();
    });

    console.log('Getting  a post req');
    console.log(req.body);
})



app.listen(port, () => {
    console.log(`app started at ${port}`)
})
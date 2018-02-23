// import express from 'express';
const express = require('express');
const hbs = require('express-handlebars');

const app = express();

const port = process.env.PORT || 3000;

//creating static folder
app.use(express.static(__dirname + "/public"));



app.engine(".hbs", hbs({
    extname:".hbs",
    defaultLayout: "index",
    layoutsDir: __dirname + "/public/views/"
}));
app.set("view engine", "hbs");
app.set("views", "./public/views");

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/books', (req,res) => {
    res.send('Hello Books ');
});

app.listen(port, (err) => {
    console.log('app listening on port ' + port)
});;
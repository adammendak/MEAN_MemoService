const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.port || 3000;



//DB
mongoose.Promist = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth');

const {User} = require('/model/user');
app.use(bodyParser.json());






app.listen(port, () => {
    console.log(`app started at ${port}`)
})
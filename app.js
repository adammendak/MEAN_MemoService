const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//DB config url string
const DB = require('./config/database');
mongoose.Promise = global.Promise;
mongoose.connect(DB.mongoURI)
    .then(() => {
    console.log('Mongodb connected ...');
    }).catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/**', (req,res)=> {
    res.sendFile(__dirname + '/static/index.html');
});

const memosRoutes = require('./routes/memos');
const userRoutes = require('./routes/user');
app.use('/api/memos', memosRoutes);
app.use('/api/user', userRoutes);

app.use(function (err, req, res, next) {
        res.json({"error" : err.name + ": " + err.message});
});

const port = process.env.port || 3000;

app.listen(3000, () => {
    console.log(`port listening on port ${port}`);
});

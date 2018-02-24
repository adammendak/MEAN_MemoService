const express = require('express');
const jquery = require('jquery');
const toastr = require('toastr');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();


//connect to mongoose, this is promise
//Map global Promise- get rid of the warning
global.toastr;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/memosDev'//, {
//    useMongoClient: true
//}
).then(() => {
    console.log('Mongodb connected ...');
}).catch(err => console.log(err));

//Load Memo Model
require('./models/memo');
const Memo = mongoose.model('memo');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Handlebars middleware
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Index Route
app.get('/', (req,res)=> {
    const title = 'Welcome to Memo service';
    res.render('index', {title: title});
});

//Add Idea Form
app.get('/memos/add', (req,res) => {
    res.render('memos/add');
});

//About Route
app.get('/about', (req,res) => {
    res.render('about');
});

app.post('/memos/add', (req,res) => {

    let errors = [];

    if(!req.body.title) {
        errors.push('please fill out title');
    }

    if(!req.body.details) {
        errors.push('please fill out details');
    }
    console.log(req.body);
    res.redirect('/');
    // toastr.success('success');
});


const port = 3000;
app.listen(3000, () => {
    console.log(`port listening on port ${port}`);
});

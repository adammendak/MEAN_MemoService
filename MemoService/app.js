const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const properties = require('./config/properties');
const app = express();


//DB config url string
const DB = require('./config/database');

//Map global Promise- get rid of the warning
mongoose.Promise = global.Promise;
mongoose.connect(DB.mongoURI)
    .then(() => {
    console.log('Mongodb connected ...');
    }).catch(err => console.log(err));

//Load Memo Model
require('./models/memo');
const Memo = mongoose.model('memo');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//override post to put
app.use(methodOverride('_method'));

//Handlebars middleware
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//session middleware, secret should be more secret
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//flash middleware
app.use(flash());

//Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.fetch_msg = req.flash('fetch_msg');
    res.locals.error = req.flash('error');
    next();
});

//Index Route
app.get('/', (req,res)=> {
    const title = 'Welcome to Memo service';
    res.render('index', {title: title});
});

//Get Memos
app.get('/memos', (req,res) => {
    Memo.find({})
        .sort({date: 'desc'})
        .then( memos => {
            res.render('memos/index', {memos : memos});
            });
});

//Add Memos Form
app.get('/memos/add', (req,res) => {
    res.render('memos/add');
});

//Edit Memos
app.get('/memos/edit/:id', (req,res) => {
    let errors = [];
    Memo.findOne({
        _id: req.params.id
    }).then( memo => {
        console.log(`found memo ${memo.toString()}`);
        res.render('memos/edit', {memo: memo});
    }).catch(((err) => {
        errors.push({
            text: 'error saving to db' + err
        });
        res.render('memos/edit', {
            errors: errors,
            memo: memo
        })
    }));

});

//About Route
app.get('/about', (req,res) => {
    res.render('about');
});

app.post('/memos/add', (req,res) => {

    let errors = [];

    if(!req.body.title) {
        errors.push({
            text : 'please fill out title'
        });
    }

    if(!req.body.details) {
        errors.push({
            text : 'please fill out details'
        });
    }
    console.log(req.body);

    if(errors.length> 0) {
        res.render('memos/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    } else {
        console.log("successfull posting of data");
        const newMemo = {
            title: req.body.title,
            details: req.body.details
        };

        new Memo(newMemo)
            .save()
            .then( () => {
                req.flash('success_msg', 'Memo has been saved!');
                res.redirect('/memos');
            })
            .catch((err) => {
                errors.push({
                    text: 'error saving to db' + err
                });
                res.render('memos/add', {
                    errors: errors,
                    title: req.body.title,
                    details: req.body.details
                })
            });

        console.log(newMemo.toString());
    }
    // toastr.success('success');
});

app.put('/memos/:id', (req,res) => {
    Memo.findOne({_id: req.params.id}).then( memo => {
        memo.title = req.body.title;
        memo.details = req.body.details;
        memo.save()
            .then(memo => {
                req.flash('success_msg', 'Memo has been updated');
                console.log(`updated memo : ${memo.toString()}`);
                res.redirect('/memos');
        });
        }).catch(err => {
        errors.push({
            text: 'error saving to db' + err
        });
        res.redirect(`memos/edit/${req.params.id}`, {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    });
});

//Delete Memo
app.delete('/memos/:id', (req,res) => {
    let errors = [];
    Memo.findOne({_id: req.params.id}).then(memo => {
        Memo.remove({
            _id: req.params.id
        }).then(() => {
            req.flash('success_msg', 'Memo has been removed');
            res.redirect('/memos');
        });
    }).catch(err => {
        errors.push({
            text: 'error deleting ' + err
        });
        res.redirect(`memos/edit/${req.params.id}`, {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    });
});

const port = process.env.port || 3000;
app.listen(3000, () => {
    console.log(`port listening on port ${port}`);
});

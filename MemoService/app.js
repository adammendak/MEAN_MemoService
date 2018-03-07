const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

const User = require('./models/User').User;

//DB config url string
const DB = require('./config/database');

//Map global Promise- get rid of the warning
mongoose.Promise = global.Promise;
mongoose.connect(DB.mongoURI)
    .then(() => {
    console.log('Mongodb connected ...');
    }).catch(err => console.log(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//cors for development purposes
app.use(cors());

//passport authenticate
// app.use(function (req, res, next) {
//    require('./config/passport');
//    next()
// });

//Static folder
//uncoment first one if hendlebars are to be used
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));
// parse application/json
app.use(bodyParser.json());

//logger
app.use(morgan('dev'));

//override post to put
app.use(methodOverride('_method'));

//Handlebars middleware
//uncomment for handlebars setup, not angular
// app.engine('handlebars', hbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

//session middleware, secret should be more secret
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport initializer
app.use(passport.initialize());
app.use(passport.session());
//Passport config
require('./config/passport').function(passport);

//flash middleware
app.use(flash());

//Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.fetch_msg = req.flash('fetch_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
//uncoment first res.render to use handlebars, otherwise this is setup for angular
app.get('/', (req,res)=> {
    const title = 'Welcome to Memo service';
    // res.render('index', {title: title});
    res.sendFile('index.html');
});

app.get('/about', (req,res) => {
    res.render('about');
});


const memosRoutes = require('./routes/memos');
const userRoutes = require('./routes/user');
app.use('/api/memos', memosRoutes);
// app.use('/memos', memosRoutes);
// app.use('/user', userRoutes);
app.use('/api/user', userRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    } else {
        res.json({"message" : err.name + ": " + err.message});
    }
});

const port = process.env.port || 3000;

app.listen(3000, () => {
    console.log(`port listening on port ${port}`);
});

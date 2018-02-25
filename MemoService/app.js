const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');


const app = express();

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

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

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

//About Route
app.get('/about', (req,res) => {
    res.render('about');
});

//Load routes
const memosRoutes = require('./routes/memos');
const userRoutes = require('./routes/user');
app.use('/memos', memosRoutes);
app.use('/user', userRoutes);

const port = process.env.port || 3000;

app.listen(3000, () => {
    console.log(`port listening on port ${port}`);
});

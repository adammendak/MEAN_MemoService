const express = require('express');
const hbs = require('express-handlebars');

const app = express();
const port = 3000;

//How middleware works
// app.use(function (req, res, next) {
//     console.log(Date.now() + " Now time");
//     req.name = "Adam";
//     next();
// });

//Handlebars middleware
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Index Route
app.get("/", (req,res)=> {
    // res.send("works");
    const title = 'Welcome to Memo service';
    res.render('index', {title: title});
});


//About Route
app.get("/about", (req,res) => {
    res.render('about');
});

app.listen(3000, () => {
    console.log(`port listening on port ${port}`);
});

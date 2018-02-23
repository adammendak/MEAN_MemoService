const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.port || 3000;



//DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth');

const {User} = require(`${__dirname}/../model/user`);
app.use(bodyParser.json());




//GET
app.get("/", (req,res) => {
    res.send(200).send();
})

//POST
app.post('/api/user', (req,res)=> {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err,doc) => {
        if(err) {
            res.status(400).send(err);
        }

        res.send(200).send(doc);
    })

});

app.post('api/user/login', (req,res) => {

    User.findOne({email:req.body.email}, (err,user) => {
        if(!user) {
            res.json({message:'Auth failed'})
        };
        res.status(200).send(user);

    })

})






app.listen(port, () => {
    console.log(`app started at ${port}`)
})
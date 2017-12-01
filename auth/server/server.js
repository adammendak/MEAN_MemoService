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


//POST
app.post('api/user', (req,res)=> {
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

})






app.listen(port, () => {
    console.log(`app started at ${port}`)
})
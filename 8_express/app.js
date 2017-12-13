const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

//creating static folder
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/books', (req,res) => {
    res.send('Hello Books ');
});

app.listen(port, (err) => {
    console.log('app listening on port ' + port)
})
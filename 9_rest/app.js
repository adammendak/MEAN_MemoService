const express = require('express');

const port = process.env.port || 3000;

const app = express();

const bookRouter = express.Router();

bookRouter.route('/books')
    .get((req,res) => {
        let book = {
            hello: "this is my book"
        }
        res.json(book);
    });


app.use('/api', bookRouter);





app.get('/', (req,res) => {
    res.send('hello mister sir');
});

app.listen(port, ()=> {
    console.log('app running on port ' + port)
});
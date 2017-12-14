const bookController = function(Book) {

    const post =function(req,res) {
        let book = new Book(req.body);

        console.log(book);
        book.save();
        res.status(201).send(book);
    };

    const get = function(req,res) {

        Book.find((err, book) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(books)
        })
    };

    return {
        post: post,
        get: get
    }
};

module.exports = bookController;
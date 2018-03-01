const MODEL_PATH = '../models/';
const Memo = require(MODEL_PATH + 'Memo');

exports.get_all_memos = function (req, res) {
        Memo.find({user: req.user.id})
            .sort({date: 'desc'})
            .then(memos => {
                res.render('memos/index', {memos: memos});
            });
};

exports.add_memo = function(req,res) {

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
            details: req.body.details,
            user: req.user.id
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
};

exports.get_memo = function(req,res) {
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
};

exports.put_memo = function(req,res) {
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
        res.redirect(`/memos/edit/${req.params.id}`, {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    });
};

exports.delete_memo = function(req,res) {
    let errors = [];
    Memo.findOne({_id: req.params.id}).then(() => {
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
        res.redirect(`/memos/edit/${req.params.id}`, {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    });
};
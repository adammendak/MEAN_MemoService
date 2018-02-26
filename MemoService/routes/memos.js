const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

//Load Memo Model
const Memo = require('../models/Memo');

//get Add Memos Form
router.get('/add', ensureAuthenticated, (req,res) => {
    res.render('memos/add');
});

router.route('/')
    .all(ensureAuthenticated, (req,res,next) => {
        next();
    })
    //get All Memos
    .get((req,res) => {
    Memo.find({user: req.user.id})
        .sort({date: 'desc'})
        .then( memos => {
            res.render('memos/index', {memos : memos});
        });
    })
    //Add New Memo
    .post((req,res) => {

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
});

router.route('/:id')
    .all(ensureAuthenticated, (req,res,next) =>{
        next();
    })
    .get((req,res) => {
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
    })
    .put((req,res) => {
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
    })
    .delete((req,res) => {
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
            res.redirect(`/memos/edit/${req.params.id}`, {
                errors: errors,
                title: req.body.title,
                details: req.body.details
            })
        });
    });

module.exports = router;
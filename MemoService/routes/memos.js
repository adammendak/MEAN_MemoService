const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Memo Model
require('../models/Memo');
const Memo = mongoose.model('memo');


//Get Memos
router.get('/', (req,res) => {
    Memo.find({})
        .sort({date: 'desc'})
        .then( memos => {
            res.render('memos/index', {memos : memos});
        });
});

//Edit Memos
router.get('/edit/:id', (req,res) => {
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
});


//Add Memos Form
router.get('/add', (req,res) => {
    res.render('memos/add');
});


router.post('/add', (req,res) => {

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
            details: req.body.details
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

router.put('/:id', (req,res) => {
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
});

//Delete Memo
router.delete('/:id', (req,res) => {
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
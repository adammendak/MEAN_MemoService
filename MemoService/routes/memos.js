const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
const memoController = require('../controllers/memoController');

router.route('/')
    .all(ensureAuthenticated, (req,res,next) => {
        next();
    })
    .get(memoController.get_all_memos)
    .post(memoController.add_memo);

router.route('/:id')
    .all(ensureAuthenticated, (req,res,next) =>{
        next();
    })
    .get(memoController.get_memo)
    .put(memoController.put_memo)
    .delete(memoController.delete_memo)

//get Add Memos Form
router.get('/add', ensureAuthenticated, (req,res) => {
    res.render('memos/add');
});

module.exports = router;
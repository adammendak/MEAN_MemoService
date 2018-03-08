const express = require('express');
const router = express.Router();
const memoController = require('../controllers/memoController');
const JWTSecret = require('../config/database').JWTSecret;

//for JWT authentication
// const jwt = require('express-jwt');
// const auth = jwt({
//     secret: `${JWTSecret}`,
//     userProperty: 'payload'
// });

// router.get('/add', ensureAuthenticated, (req,res) => {
//     res.render('memos/add');
// });
router.get('/add', (req,res) => {
    res.render('memos/add');
});


router.route('/')
    .all((req,res,next) => {
    // .all(ensureAuthenticated, (req,res,next) => {
        next();
    })
    .get(memoController.get_all_memos)
    .post(memoController.add_memo);

router.route('/:id')
    .all((req,res,next) =>{
    // .all(ensureAuthenticated, (req,res,next) =>{
        next();
    })
    .get(memoController.get_memo)
    .put(memoController.put_memo)
    .delete(memoController.delete_memo);

module.exports = router;
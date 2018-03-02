const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
const memoController = require('../controllers/memoController');
const JWTSecret = require('../config/passport').JWTSecret;

//for JWT authentication
const jwt = require('express-jwt');
const auth = jwt({
    secret: `${JWTSecret}`,
    userProperty: 'payload'
});

// router.get('/add', ensureAuthenticated, (req,res) => {
//     res.render('memos/add');
// });
router.get('/add', auth, (req,res) => {
    res.render('memos/add');
});


router.route('/')
    .all(auth, (req,res,next) => {
    // .all(ensureAuthenticated, (req,res,next) => {
        next();
    })
    .get(memoController.get_all_memos)
    .post(memoController.add_memo);

router.route('/:id')
    .all(auth, (req,res,next) =>{
    // .all(ensureAuthenticated, (req,res,next) =>{
        next();
    })
    .get(memoController.get_memo)
    .put(memoController.put_memo)
    .delete(memoController.delete_memo);

module.exports = router;
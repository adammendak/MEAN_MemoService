const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/login')
    .get(userController.get_login_form)
    .post(userController.log_user);

router.get('/logout', userController.logout);

router.route('/register')
    .get((req,res) => {
    res.render('user/register');
    })
    .post(userController.register_new_user);

module.exports = router;
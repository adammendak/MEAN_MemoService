const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/login')
    .post(userController.log_user);

router.route('/register')
    .post(userController.register_new_user);

module.exports = router;
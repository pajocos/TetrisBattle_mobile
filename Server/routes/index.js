var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

//LOGIN
router.route('/login').post(auth.loginUser);

module.exports = router;
var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

//AUTH
router.route('/login').post(auth.loginUser);
router.route('/register').post(auth.registerUser);

module.exports = router;
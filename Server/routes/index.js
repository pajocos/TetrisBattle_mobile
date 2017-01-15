var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');
var scores = require('../controllers/scores');

//AUTH
router.route('/login').post(auth.loginUser);
router.route('/register').post(auth.registerUser);

//SCORES
router.route('/getScore').get(scores.getHighScore);
router.route('/getPoints').get(scores.getExpPoints);
router.route('/updateScore').post(scores.updateHighScore);
router.route('/updatePoints').post(scores.updateExpPoints);

module.exports = router;
const express = require('express');
const router = express.Router();
const feedController = require('../controller/feed.controller');

router.get('/feed', feedController.getFeed);

require('dotenv').config();


module.exports = router;

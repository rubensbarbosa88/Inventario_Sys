var express = require('express');
var router = express.Router();
var home = require('../controller/HomeController');

//Home
    router
        .get('/', home.home);


module.exports = router;

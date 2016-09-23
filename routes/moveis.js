var express = require('express');
var router = express.Router();
var home = require('../controller/HomeController');
var inventMoveis = require('../controller/Moveis.ModelsController');

//computers
    router
        .get('/', home.moveis);

//db-get/post
    router
        .get('/inventmoveis', inventMoveis.getDb)
        .post('/inventmoveis', inventMoveis.postDb)
        .put('/inventmoveis/:id', inventMoveis.updDb)
        .delete('/inventmoveis/:id', inventMoveis.delDb);

module.exports = router;
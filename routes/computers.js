var express = require('express');
var router = express.Router();
var home = require('../controller/HomeController');
var inventComputers = require('../controller/Computers.ModelsController');

//computers
    router
        .get('/', home.computers);

//db-get/post
    router
        .get('/inventcomputers', inventComputers.getDb)
        .post('/inventcomputers', inventComputers.postDb)
        .put('/inventcomputers/:id', inventComputers.updDb)
        .delete('/inventcomputers/:id', inventComputers.delDb);

module.exports = router;
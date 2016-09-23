var express = require('express');
var router = express.Router();
var home = require('../controller/HomeController');
var inventScreens = require('../controller/Others.ModelsController');

//monitores
    router
        .get('/', home.others);

//db-get/post
    router
        .get('/inventothers', inventScreens.getDb)
        .post('/inventothers', inventScreens.postDb)
        .put('/inventothers/:id', inventScreens.updDb)
        .delete('/inventothers/:id', inventScreens.delDb);


module.exports = router;
var express = require('express');
var router = express.Router();
var home = require('../controller/HomeController');
var inventScreens = require('../controller/Sreens.ModelsController');

//monitores
    router
        .get('/', home.screens);

//db-get/post
    router
        .get('/inventscreens', inventScreens.getDb)
        .post('/inventscreens', inventScreens.postDb)
        .put('/inventscreens/:id', inventScreens.updDb)
        .delete('/inventscreens/:id', inventScreens.delDb);


module.exports = router;
(function() {

    log = module.exports = console.log.bind(console);
    http = module.exports = require("http");
    express = module.exports = require("express");
    app = module.exports = express();
    mongoose = module.exports = require("mongoose");
    multer = module.exports = require('multer');
    bodyParser = module.exports = require('body-parser')
    fs = module.exports = require('fs');
    bcrypt = module.exports = require("bcryptjs");
    jwt = module.exports = require('jwt-simple');
    cors = module.exports = require('cors');
    moment = module.exports = require('moment');
    saltRounds = module.exports = 20;

})();
(function() {

    app.set("PORT", 3001 || process.env.PORT);

    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function(req, file, cb) {
            log("####################");
            log("Multer Name :");
            log(file);
            log("####################");

            cb(null, Date.now() + file.originalname);

        }
    });

    app.use(express.static("public/www"));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: false
    }))

    // parse application/json
    app.use(bodyParser.json())



    upload = module.exports = multer({
        storage: storage
    });


    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    });


    // JWT Common Function
    createJWT = module.exports = function(mobileNumber) {

        var timer = moment().add(1, 'days').unix();
        var payload = {
            sub: mobileNumber,
            iat: moment().unix(),
            exp: timer
        };
        log("JWT Token Expiry Set For :");
        log(timer);
        return jwt.encode(payload, "thisisatest");
    }

    ensureAuthenticated = module.exports = function(req, res, next) {
        if (!req.header('Authorization')) {
            return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
        }
        var token = req.header('Authorization').split(' ')[1];

        var payload = null;
        try {
            payload = jwt.decode(token, "thisisatest");
        } catch (err) {
            return res.status(401).send({ message: 'Auth has Expired.Please Login Again', status: false, isTokenValid: false });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Auth has Expired.Please Login Again', status: false, isTokenValid: false });
        }
        req.user = payload.sub;
        next();
    }


})()
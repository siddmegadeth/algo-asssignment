(function() {

    ProfileSchema = module.exports = mongoose.Schema({
        username: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        fullname: {
            type: String,
            required: true

        },
        display_picture: {
            type: String
        },
        isProfileCompleted: {
            type: Boolean,
            deafult: false
        },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    });


    ProfileSchema.pre('save', function(next) {
        log("Saving  Profile Data :");
        now = new Date();
        this.updated_at = now;
        if (!this.created_at) {
            this.created_at = now
        }
        next();
    });


    ProfileSchema.pre("save", function(next) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });

    });


    // test Function
    ProfileSchema.methods.find = function(cb) {
        this.model('ProfileModel').findOne({}, cb);
    };

    //Pass Comparison Function
    ProfileSchema.methods.comparePassword = function(password, cb) {
        log("Compare Password with HASHED pass");
        log(password);
        log("HASHED");
        log(this.password);
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return cb(err);

            log("Return Status:");
            log(isMatch);
            cb(null, isMatch);
        });
    };

    ProfileModel = module.exports = mongoose.model("ProfileModel", ProfileSchema);

})()
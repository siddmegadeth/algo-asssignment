(function() {

    ProfileSchema = module.exports = mongoose.Schema({
        user_name: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,

        },
        full_name: {
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

    ProfileModel = module.exports = mongoose.model("ProfileModel", ProfileSchema);
    //Import Function To Be Used For Mongoose
    require("./profile-functions");

})()
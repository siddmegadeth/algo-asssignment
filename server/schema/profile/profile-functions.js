(function() {

    // test Function
    ProfileSchema.methods.testCollection = function(cb) {
        this.model('ProfileModel').findOne({}, cb);
    };


})();
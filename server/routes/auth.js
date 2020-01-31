(function() {

    app.post("/user/auth", function(req, resp) {
        log("/user/auth");
        var profile = req.query.profile || req.body.profile || req.param["profile"];
        profile = JSON.parse(profile);
        log(profile);
        // perform database search 
        ProfileModel.findOne({ username: profile.username }, function(err, found) {
            if (err) {
                resp.send({ error: err, message: 'Some Error Occured', status: false });
            }
            if (found) {
                log("Existing User Found :");
                log(found);
                var token = createJWT(found);
                log("Token Generated :");
                log(token);
                log("Password Comparison ");
                log("Encrpt Password:");
                log(found.password);
                log("Received Password :");
                log(profile.password);


                found.comparePassword(profile.password, function(passErr, isMatch) {

                    if (passErr) {
                        resp.send({ error: err, message: 'Some Error Occured Comparing Password', status: false });
                    }

                    if (isMatch) {
                        log("Password Match");
                        resp.send({ message: "Welcome Back " + found.username, isNewUser: false, isPasswordCorrect: true, status: true, token: token, profile: found });

                    } else {
                        log("Password Did Not Match");
                        resp.send({ message: "Password Incorect", isNewUser: false, isPasswordCorrect: false, status: true });
                    }


                });

            } else {
                log('User Does Not Exist');
                resp.send({ message: 'Profile Does Not Exist', status: true, isNewUser: true });
            }

        });
    });


    app.post("/user/signup", function(req, resp) {
        log("/user/signup");
        var profile = req.query.profile || req.body.profile || req.param["profile"];
        profile = JSON.parse(profile);
        log(profile);

        // perform database search 
        ProfileModel.findOne({
            $or: [{
                'email': profile.email
            }, {
                'username': profile.username
            }]
        }, function(err, found) {

            log("Resuts From Searching For Profile");
            log(found);

            if (err) {
                resp.send({ error: err, message: 'Some Error Occured', status: false });
            }

            if (found) {
                log('User Exist');
                log(found);
                resp.send({ message: 'Profile Already Exist', status: true, isNewUser: false });

            } else {

                log("User Does Not Exist. Creating A New Profile");
                var tuple = new ProfileModel({
                    username: profile.username,
                    email: profile.email,
                    fullname: profile.fullname,
                    password: profile.password,
                    isProfileCompleted: true
                });
                log(tuple);

                tuple.save(function(errSaved, saved) {

                    log("Saved Profile Data");
                    log(saved);
                    if (errSaved) {
                        log(errSaved);
                        resp.send({ error: errSaved, message: 'Not Able To Save. Error Occured', status: false });
                    }

                    if (saved) {
                        resp.send({ message: 'Created New User. Login To Continue', status: true, isNewUser: true, redirectTo: 'login' });
                    } else {
                        resp.send({ message: 'Unable To Create New Profile', status: true, isNewUser: false });
                    }

                });

            }

        });
    });

})()
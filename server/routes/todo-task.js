(function() {


    app.get('/get/todo/list', ensureAuthenticated, function(req, resp) {
        log('/get/todo/list');
        var username = req.body.username || req.query.username || req.param["username"];
        taskToDoModel.findOne({ username: username }, function(errFound, found) {
            if (errFound) {
                resp.send({ error: errFound, message: 'Some Error Occured In Todo List', status: false });
            }

            if (found) {
                log("Found Todo List");
                resp.send({ message: 'Todo List Fetched', status: true, profile: found });
            } else {

                log("Not Able To Find Todo List");
                resp.send({ message: 'Not Able To Get Todo List Or List Is Empty', status: true, profile: undefined });
            }

        });


    });

    app.get('/get/save/todo', ensureAuthenticated, function(req, resp) {
        log('/get/save/todo');
        var list = req.body.list || req.query.list || req.param["list"];
        var username = req.body.username || req.query.username || req.param["username"];

        list = JSON.parse(list);
        log("List Todo Tasks");
        log(list);
        log("For Current Profile :");
        log(username);

        taskToDoModel.findOne({ username: username }, function(errFound, found) {
            if (errFound) {
                resp.send({ error: errFound, message: 'Some Error Occured In Todo List', status: false });
            }

            if (found) {
                log("Username Found in Todo List");
                taskToDoModel.findOneAndUpdate({ username: username }, { new: true }, {
                    $push: {
                        task: list
                    }
                }, function(initErr, initUpdate) {
                    if (initErr) {
                        log("Error Occured While Updating Favorites");
                        log(initErr);
                        resp.send({ error: initErr, message: 'Some Error Occured While Updating Todo List', status: false });

                    }

                    log("Updated Todo list :");
                    log(initUpdate);
                    resp.send({ message: 'Todo List Updated', status: true, profile: initUpdate });

                });

            } else {

                log("No Username Found in Todo List.Creating User And Todo List");
                var tupleTodoList = new taskToDoModel({
                    username: username,
                    task: list
                });
                tupleTodoList.save(function(errSave, saved) {
                    if (errSave) {
                        resp.send({ error: errFound, message: 'Some Error Occured While Saving Todo List', status: false });
                    }

                    if (saved) {
                        resp.send({ message: 'Created New Todo List', status: true });
                    } else {
                        resp.send({ message: 'Not Able To Create Todo List', status: true });

                    }

                });


            }

        });
    });

})();
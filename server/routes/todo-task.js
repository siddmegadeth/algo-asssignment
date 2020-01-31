(function() {

    app.get('/get/save/todo', ensureAuthenticated, function(req, resp) {
        log('/get/save/todo');
        var list = req.body.list || req.query.list || req.param["list"];
        log(list);
        resp.send(200);
    });

})();
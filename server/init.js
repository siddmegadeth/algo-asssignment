(function() {
    require("./init/index");
    require("./schema/index"); // Import Schema
    require("./routes/index"); // Import Routes



    http.createServer(app).listen(app.get("PORT"), function() {
        log("Algo Server Core  Started :" + app.get("PORT"));
    });


})()
app.controller('landingCtrl', ['$scope', '$timeout', 'rest', 'stateManager', function($scope, $timeout, rest, stateManager) {

    $scope.landingLoader = true;


    var myNavigator = document.querySelector('ons-navigator');
    myNavigator.addEventListener('postpush', function(event) {
        error("'pushPage' is completed!");
        log(event);
    });

    $scope.addToDoTask = function() {

        $scope.myNavigator.pushPage('todo-task.html', {
            animation: 'lift-md'
        });
    };


    $scope.pulltoRefresh = function($done) {
        $timeout(function() {
            $scope.getUpdatedToDoList();

            $done();
        }.bind(this), 1000);
    }.bind(this);



    $scope.deleteTodoList = function() {

    };

    $scope.getUpdatedToDoList = function() {

        $scope.landingLoader = true;

        warn("Get Updated Todo List");
        rest.getTodoList().then(function(resp) {

            $scope.landingLoader = false;

            warn("Retrieving Todo List");
            log(resp);
            log(resp.status);

            if (resp.data && !rest.isRestError(resp)) {

                if (resp.data.profile != undefined) {
                    $timeout(function() {
                        $scope.todoList = resp.data.profile.task;
                        warn("Todo List Retrieved");
                        log($scope.todoList);

                    });
                } else {

                    $timeout(function() {
                        warn("Todo List Empty");

                        $scope.todoList = [];

                    });
                }

            } else {

                warn("Server Error Detected /Or Token Has Expired:");

                stateManager.clearAll();
                $scope.myNavigator.resetToPage('login.html', {
                    animation: 'slide-md'
                });

            }
        });
    }

    $scope.logout = function() {
        warn("Logout");
        stateManager.clearAll();
        $scope.myNavigator.resetToPage('login.html', {
            animation: 'lift-md'
        });
    }


    $timeout(function() {
        $scope.getUpdatedToDoList();
    })

}]);
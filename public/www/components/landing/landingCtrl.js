app.controller('landingCtrl', ['$scope', '$timeout', 'rest', 'stateManager', function($scope, $timeout, rest, stateManager) {


    $scope.addToDoTask = function() {

        $scope.myNavigator.pushPage('todo-task.html', {
            animation: 'lift-md'
        });
    };



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


    $timeout(function() {
        $scope.getUpdatedToDoList();
    })

}]);
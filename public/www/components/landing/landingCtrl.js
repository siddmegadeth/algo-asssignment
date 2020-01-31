app.controller('landingCtrl', ['$scope', '$timeout', 'rest', 'stateManager', function($scope, $timeout, rest, stateManager) {


    $scope.addToDoTask = function() {

        $scope.myNavigator.pushPage('todo-task.html', {
            animation: 'lift-md'
        });
    };

    $scope.saveTask = function(task) {
        warn("Task List");
        log(task);
        rest.saveTodo(task).then(function(resp) {
            warn("Saving Todo List");
            log(resp);
            log(resp.status);

            if (resp.data && !rest.isRestError(resp)) {

            } else {

                warn("Server Error Detected /Or Token Has Expired:");

                stateManager.clearAll();
                $scope.myNavigator.resetToPage('login.html', {
                    animation: 'slide-md'
                });

            }
        });
    }

    $scope.cancelTask = function() {

    }

}]);
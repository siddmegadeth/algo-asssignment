app.controller('todoTaskCtrl', ['$scope', 'rest', '$timeout', 'stateManager', function($scope, rest, $timeout, stateManager) {

    $scope.saveTask = function(task) {
        $scope.toDoTaskLoader = true;

        warn("Task List");
        log(task);
        rest.saveTodo(task).then(function(resp) {
            $scope.toDoTaskLoader = false;

            warn("Saving Todo List");
            log(resp);
            log(resp.status);

            if (resp.data && !rest.isRestError(resp)) {

                warn("Response After Updating List");
                log(resp);
                ons.notification.toast(resp.data.message, {
                    timeout: 3000
                });

               
            } else {

                warn("Server Error Detected /Or Token Has Expired:");

                stateManager.clearAll();
                $scope.myNavigator.resetToPage('login.html', {
                    animation: 'slide-md'
                });

            }
        });
    };

}])
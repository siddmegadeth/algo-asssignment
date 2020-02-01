app.controller('todoTaskDetailsCtrl', ['$scope', 'rest', 'stateManager', '$timeout', function($scope, rest, stateManager, $timeout) {

    $timeout(function() {
        warn("Received Data");
        log($scope.myNavigator.topPage.pushedOptions);
        $scope.tuple = $scope.myNavigator.topPage.pushedOptions.data.task;
    });

    $scope.deleteTask = function(task) {

        rest.deleteTodo(task).then(function(resp) {
            warn("Response From Task Todo Deletetion");
            log(resp);

            if (resp.data && !rest.isRestError(resp)) {
                if (resp.data.status) {

                    if (resp.data.isTaskDeleted) {

                        ons.notification.toast(resp.data.message, {
                            timeout: 2000
                        });
                        $scope.myNavigator.popPage().then(function() {
                            $timeout(function() {

                                ons.notification.toast('Pull To Refresh List', {
                                    timeout: 2000
                                });
                            })

                        });

                    }
                }

            }

        });
    };
}])
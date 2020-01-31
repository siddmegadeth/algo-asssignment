app.controller('landingCtrl', ['$scope', '$timeout', function($scope, $timeout) {


    $scope.addToDoTask = function() {

        $scope.myNavigator.pushPage('todo-task.html', {
            animation: 'lift-md'
        });
    };

}]);
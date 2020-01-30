app.controller('loginCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.signup = function() {

        $scope.myNavigator.pushPage('sign-up.html', {
            animation: 'slide-md'
        });
    }

}]);
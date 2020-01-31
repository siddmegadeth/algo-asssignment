app.controller('verifyCtrl', ['$scope', '$timeout', 'stateManager', function($scope, $timeout, stateManager) {

    $scope.verifyLoader = true;

    warn("Initiating App...Checking If User Is Logged In or Not");
    $timeout(function() {
        //perform check if user logged in or not


        $scope.myNavigator.resetToPage('login.html', {
            animation: 'lift-md'
        });

    });

}])
app.controller('verifyCtrl', ['$scope', '$timeout', 'stateManager', function($scope, $timeout, stateManager) {

    $scope.verifyLoader = true;

    warn("Initiating App...Checking If User Is Logged In or Not");
    $timeout(function() {
        //perform check if user logged in or not
        if (stateManager.getToken() != undefined) {

            $scope.myNavigator.resetToPage('landing.html', {
                animation: 'lift-md'
            }).then(function() {
                var profile = stateManager.getProfile();
                ons.notification.toast('Welcome back ' + profile.username, {
                    timeout: 2000
                });

            });


        } else {
            $scope.myNavigator.resetToPage('login.html', {
                animation: 'slide-md'
            }).then(function() {
                ons.notification.toast('Not Logged In', {
                    timeout: 2000
                });

            });
        }

    });

}])
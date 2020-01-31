app.controller('verifyCtrl', ['$scope', '$timeout', 'stateManager', 'rest', function($scope, $timeout, stateManager, rest) {

    $scope.verifyLoader = true;

    warn("Initiating App...Checking If User Is Logged In or Not");
    $timeout(function() {
        //perform check if user logged in or not
        if (stateManager.getToken() != undefined) {

            warn("Token Found");
            warn("Validating The Token");
            rest.validateToken().then(function(validResp) {
                warn("Token Validation Result :");
                log(validResp);
                if (!validResp.data.isTokenValid) {
                    warn("Invalid Token.. Redirecting To Login");
                    warn("Token Empty");
                    stateManager.clearAll();
                    $scope.myNavigator.resetToPage('login.html', {
                        animation: 'slide-md'
                    });

                } else {

                    log(stateManager.getToken());
                    $scope.myNavigator.resetToPage('landing.html', {
                        animation: 'lift-md'
                    }).then(function() {

                        var profile = stateManager.getProfile();
                        ons.notification.toast('Welcome back ' + profile.username, {
                            timeout: 2000
                        });
                    });
                }

            });

        } else {

            warn("Token Empty");
            stateManager.clearAll();
            $scope.myNavigator.resetToPage('login.html', {
                animation: 'slide-md'
            });
        }

    });

}])
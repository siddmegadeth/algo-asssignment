app.controller('loginCtrl', ['$scope', '$timeout', 'rest', 'stateManager', function($scope, $timeout, rest, stateManager) {


    $scope.signup = function() {

        $scope.myNavigator.pushPage('sign-up.html', {
            animation: 'slide-md'
        });
    }

    $scope.login = function(profile) {
        $scope.loginLoader = true;
        loginModal.show();
        warn("Profile :");
        log(profile);
        rest.authenticate(profile).then(function(resp) {
            warn("Response From Server on Auth:");
            log(resp);
            loginModal.hide();
            $scope.loginLoader = false;

            if (resp.data && !rest.isRestError(resp)) {
                if (resp.data.status) {
                    if (!resp.data.isNewUser && resp.data.isPasswordCorrect) {
                        ons.notification.toast(resp.data.message, {
                            timeout: 3000
                        });
                        // save state and token 
                        $scope.filterAndSaveProfile(resp.data);

                    } else {

                        ons.notification.toast(resp.data.message, {
                            timeout: 3000
                        });
                    }

                } else {

                    ons.notification.toast(resp.data.message, {
                        timeout: 3000
                    });

                }

            } else {

                warn("Server Error Detected /Or Token Has Expired:");
                ons.notification.toast(resp.data.message, {
                    timeout: 2000
                });
                stateManager.clearAll();
                $scope.myNavigator.resetToPage('verify.html', {
                    animation: 'slide-md'
                });
            }

        });
    }


    $scope.filterAndSaveProfile = function(profile) {
        warn('Saving Profile And Token ');
        log(profile);
        stateManager.saveToken(profile.token);
        stateManager.saveProfile(profile.profile);
        $scope.myNavigator.resetToPage('landing.html', {
            animation: 'lift-md'
        });
    }

}]);
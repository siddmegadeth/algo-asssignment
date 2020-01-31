app.controller('signUpCtrl', ['$scope', 'ValidationService', 'rest', '$timeout', 'stateManager', function($scope, ValidationService, rest, $timeout, stateManager) {
    var myValidation = new ValidationService();

    $scope.signup = function(profile) {
        signUpModal.show();

        $scope.signUpLoader = true;
        warn("Signup :");
        log(profile);
        rest.signup(profile).then(function(resp) {
            warn("Sign Up Result");
            log(resp);
            $scope.signUpLoader = false;
            signUpModal.hide();


            if (resp.data && !rest.isRestError(resp)) {

                if (resp.data.status && !resp.data.isNewUser) {
                    ons.notification.toast(resp.data.message, {
                        timeout: 2000
                    });
                } else {
                    ons.notification.toast(resp.data.message, {
                        timeout: 2000
                    });
                }

            } else {

                warn("Server Error Detected /Or Token Has Expired:");
                ons.notification.toast(resp.data.message, {
                    timeout: 2000
                });
                stateManager.clearAll();
                $scope.myNavigator.resetToPage('login.html', {
                    animation: 'slide-md'
                });
            }
        });
    }

}])
app.controller('signUpCtrl', ['$scope', 'ValidationService', 'rest', '$timeout', function($scope, ValidationService, rest, $timeout) {
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


            if (resp.data) {

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
                ons.notification.toast('Server Not Available', {
                    timeout: 2000
                })

            }
        });
    }

}])
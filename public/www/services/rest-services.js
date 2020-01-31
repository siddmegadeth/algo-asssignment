app.service('rest', ['$http', function($http) {

    return {
        authenticate: function(form) {

            return $http({
                method: 'POST',
                url: '/user/auth/',
                params: {
                    profile: form
                }
            })
        },
        signup: function(form) {

            return $http({
                method: 'POST',
                url: '/user/signup/',
                params: {
                    profile: form
                }
            })
        }
    }
}]);
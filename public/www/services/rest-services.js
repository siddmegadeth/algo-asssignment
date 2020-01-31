app.service('rest', ['$http', function($http) {

    return {
        authenticate: function(form) {

            return $http({
                method: 'POST',
                url: '/post/user/auth/',
                params: {
                    profile: form
                }
            })
        },
        signup: function(form) {

            return $http({
                method: 'POST',
                url: '/post/user/signup/',
                params: {
                    profile: form
                }
            })
        },
        saveTodo: function(list) {
            return $http({
                method: 'GET',
                url: '/get/save/todo',
                params: {
                    list: list
                }
            })

        },
        validateToken: function() {
            return $http({
                method: 'POST',
                url: "/post/validate/token",
            })
        },
        isRestError: function(config) {


            warn("Rest Warning Status :");
            log(config.status);
            if (config.status == 404) {
                log(true);
                return true;

            } else if (config.status == 401) {
                log(true);
                return true;

            } else if (config.status == 501) {
                log(true);
                return true;


            } else if (config.status == 500) {
                log(true);
                return true;
            }

            if (config.status == 500) {
                log(true);
                return true;
            }

            if (config.status == 503) {
                log(true);
                return true;
            }
            log(false);
            return false;
        }
    }
}]);
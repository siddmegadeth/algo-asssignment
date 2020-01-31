app.service('stateManager', ['$http', '$window', function($http, $window) {

    return {
        saveToken: function(token) {
            $window.localStorage.setItem('access_token', token);
        },
        getToken: function(form) {
            return $window.localStorage.access_token;
        },
        saveProfile: function(profile) {
            $window.localStorage.setItem('profile', JSON.stringify(profile));

        },
        getProfile: function() {
            return JSON.parse($window.localStorage.profile);
        },
        clearAll: function() {
            window.localStorage.clear();
        }
    }
}]);
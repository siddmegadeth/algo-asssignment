app.service('httpTimeoutInterceptors', ['$timeout', '$rootScope', function($timeout, $rootScope) {

    return {


        request: function(config) {
            config.timeout = 25000;
            return config;
        },
        response: function(config) {

            return config;

        }

    }

}]);

app.service('httpInterceptors', ['$timeout', '$rootScope', function($timeout, $rootScope) {

    return {


        request: function(config) {
            return config;
        },
        response: function(config) {



            return config;

        },
        requestError: function(config) {

            return config;

        },
        responseError: function(config) {

            if (config.status == 404) {

                ons.notification.toast(config.data.result || config.data.message, {
                    timeout: 2000
                });

            } else if (config.status == 401) {

                ons.notification.toast(config.data.result || config.data.message, {
                    timeout: 2000
                });
            } else if (config.status == 501) {

                ons.notification.toast(config.data.result || config.data.message, {
                    timeout: 2000
                });
            } else if (config.status == 500) {

                ons.notification.toast(config.data.result || config.data.message, {
                    timeout: 2000
                });
            }

            if (config.status == 500) {

                ons.notification.toast(config.data.result || config.data.message, {
                    timeout: 2000
                });
            }

            if (config.status == 503) {
                ons.notification.toast(config.data.result || config.data.message, {
                    timeout: 2000
                });
            }


            return config;

        }


    }

}]);
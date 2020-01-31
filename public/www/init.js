var DI = [
    'ghiscoding.validation',
    'ngMessages',
    'onsen',
    'satellizer',
    'pascalprecht.translate'
];

var win = new winDevice("myApp", DI); //Bootstrap Cordova Or Browser Based App .no ng-app Required
var app = win.device(); // init App
win.enable(true);
win.info();


// Make Platform Selection Choose Either ios or android
ons.platform.select('android');

ons.ready(function() {
    warn("ONSENUI Ready");
    if (ons.platform.isIPhoneX()) { // Utility function
        warn("Platform Is iPhoneX :");
        // Add empty attribute to the <html> element
        document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
    }
});


app.config(['$translateProvider', '$httpProvider', function($translateProvider, $httpProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: 'plugins/angular-validation-master/locales/validation/',
        suffix: '.json'
    });

    // define translation maps you want to use on startup
    $translateProvider.preferredLanguage('en');
    $httpProvider.interceptors.push('httpInterceptors');
    $httpProvider.interceptors.push('httpTimeoutInterceptors');

}]);

// Run once Change in Route Happens
app.run(['$rootScope', function($rootScope) {

    $rootScope.$on('$routeChangeStart', function(event, current, next) {});

    $rootScope.$on('$routeChangeSuccess', function() {});

}]);
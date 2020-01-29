var DI = [
    'jcs-autoValidate',
    'ngMessages',
    'onsen',
    'satellizer'
];

var win = new winDevice("myApp", DI); //Bootstrap Cordova Or Browser Based App .no ng-app Required
var app = win.device(); // init App
win.enable(true);
win.info();

ons.platform.select('android');
ons.ready(function() {
    warn("ONSENUI Ready");


    if (ons.platform.isIPhoneX()) { // Utility function
        warn("Platform Is iPhoneX :");
        // Add empty attribute to the <html> element
        document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
    }
});



app.config(['$locationProvider', function($locationProvider) {

    $locationProvider.hashPrefix('');

}]);


// Run once Change in Route Happens
app.run(['$rootScope', function($rootScope) {




    $rootScope.$on('$routeChangeStart', function(event, current, next) {


    });

    $rootScope.$on('$routeChangeSuccess', function() {

    });


}]);
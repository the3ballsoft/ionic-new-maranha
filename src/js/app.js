// Ayre Mobile App

angular.module('newMaranha', 
[
  'ionic',
  'ngCordova',
  'templates',
  'newMaranha.layouts',
  'newMaranha.auth',
  'angularMoment'
])

.run(['$ionicPlatform', '$rootScope', '$ionicLoading', 'amMoment', 
     function($ionicPlatform, $rootScope, $ionicLoading) {
       $ionicPlatform.ready(function() {
         // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
         // for form inputs)
         if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
           cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
           cordova.plugins.Keyboard.disableScroll(true);
         }
         if (window.StatusBar) {
           // org.apache.cordova.statusbar required
           window.StatusBar.backgroundColorByHexString("#013280");
         }
         $rootScope.$on('loading:show', function() {
           $ionicLoading.show({
             template: '<div class="loader"> \
             <svg class="circular"> \
             <circle class="path" cx="50" cy="50" r="20" fill="none"  \
             stroke-width="3" stroke-miterlimit="10"/></svg></div>',
             hideOnStateChange: true
           });
         });

         $rootScope.$on('loading:hide', function() {
           $ionicLoading.hide()
         });

        //amMoment.changeLocale('es');
       });
}])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('login', {
      url: "/",
      templateUrl: "js/auth/login.html",
      controller: 'LoginCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'js/layouts/menu.html',
    controller: 'MenuCtrl'
  })

  //.state('app.profile', {
    //url: '/profile',
    //views: {
      //'menuContent': {
        //templateUrl: 'js/profile/profile.html',
        //controller: 'ProfileCtrl'
      //}
    //}
  //})

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  //interceptor http
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        if(!config.noblock) $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  });

}])

.constant("CONFIG", {
  "url": "http://ayremovil.herokuapp.com/",
  "API_URL" : "https://ayre.unimagdalena.edu.co:81/WebServicesAyREMobile/AyreMobile/"
});


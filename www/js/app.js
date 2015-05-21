// Ionic Starter App
var app = angular.module('mingroom', ['ionic','firebase'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 100);
 });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.camera', {
      url: '/camera',
      views: {
        'camera': {
          templateUrl: 'templates/camera/list.html',
          controller: 'CameraCtrl'
        }
      }
    })

    .state('tab.cameraDetail', {
      url: '/camera/:id',
      views: {
        'camera': {
          templateUrl: 'templates/camera/detail.html',
          controller: 'CameraDetailCtrl'
        }
      }
    })

    .state('tab.lens', {
      url: '/lens',
      views: {
        'lens': {
          templateUrl: 'templates/lens/list.html',
          controller: 'LensCtrl'
        }
      }
    })

    .state('tab.lensDetail', {
      url: '/lens/:id',
      views: {
        'lens': {
          templateUrl: 'templates/lens/detail.html',
          controller: 'LensDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'account': {
          templateUrl: 'templates/account/about.html',
          controller: 'AccountCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/camera');

});
'use strict';

angular
  .module('ContactsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase',
    'routeSecurity',
    'simpleLoginTools',
    'ngMessages'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/contacts', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        authRequired: true // only show if user is loggedin
      })
      .when('/contact/new', {
        controller: 'NewController',
        templateUrl: 'views/new.html',
        authRequired: true // only show if user is loggedin
      })
      .when('/contact/:id', {
        controller: 'SingleController',
        templateUrl: 'views/single.html',
        authRequired: true // only show if user is loggedin
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/logout', {
        template: 'Logging out...',
        controller: 'LogoutCtrl'
      })
      .when('/settings', {
        controller: 'SettingsController',
        templateUrl: 'views/settings.html',
        authRequired: true // only show if user is loggedin
      })
      .otherwise({
        redirectTo: '/contacts'
      });
  })
  .constant('FBURL', 'https://af-contacts.firebaseio.com/')// firebase url
  .constant('MSGURL', 'https://af-contacts.firebaseio.com/contacts')// messages url
  .constant('OPTIONSURL', 'https://af-contacts.firebaseio.com/options') // user settings url
  .constant('loginRedirectPath', '/login'); // redirect to if not loggedin

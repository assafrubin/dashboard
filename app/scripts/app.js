'use strict';

/**
 * @ngdoc overview
 * @name MaterialApp
 * @description
 * # MaterialApp
 *
 * Main module of the application.
 */
window.app_version = 2.0;

angular
  .module('MaterialApp', [
    'ui.router',
    'ngResource',
    'ngAnimate',
    'ngMaterial',
    'chart.js',
    'gridshore.c3js.chart',
    'angular-growl',
    'growlNotifications',
    'angular-loading-bar',
    'easypiechart',
    'ui.sortable',
    angularDragula(angular),
    'bootstrapLightbox',
    'materialCalendar',
    'paperCollapse',
    'pascalprecht.translate'
  ])
  //.config(function(envServiceProvider) {
  //  // set the domains and variables for each environment
  //  envServiceProvider.config({
  //    vars: {
  //      production: {
  //        sensorsServer: {
  //          host: '52.37.84.168:5115'
  //        }
  //      },
  //      development: {
  //        sensorsServer: {
  //          host: 'localhost:5115'
  //        }
  //      }
  //    }
  //  });
  //
  //  // run the environment check, so the comprobation is made
  //  // before controllers and services are built
  //  envServiceProvider.check();
  //})
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 5;
    cfpLoadingBarProvider.includeSpinner = false;
  }])

  .config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })

  .config(function($stateProvider, $urlRouterProvider, USER_ROLES) {

    $urlRouterProvider.when('/dashboard', '/dashboard/home');
    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html?v='+window.app_version,
        controller: 'DashboardCtrl'
      })
      .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/pages/login.html?v='+window.app_version,
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        parent: 'base',
        templateUrl: 'views/pages/signup.html?v='+window.app_version,
        controller: 'LoginCtrl'
      })
      .state('logout', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/pages/login.html?v='+window.app_version,
        controller: 'LoginCtrl'
      })
      .state('404', {
        url: '/404-page',
        parent: 'base',
        templateUrl: 'views/pages/404-page.html?v='+window.app_version
      })
      .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'views/layouts/dashboard.html?v='+window.app_version,
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        },
        controller: 'DashboardCtrl'
      })
      .state('home', {
        url: '/home',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/home.html?v='+window.app_version,
        controller: 'HomeCtrl'
      })
      .state('blank', {
        url: '/blank',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/blank.html?v='+window.app_version
      })
      .state('profile', {
        url: '/profile',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/profile.html?v='+window.app_version,
        controller: 'profileCtrl'
      })
      .state('form', {
        url: '/form',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/form.html?v='+window.app_version,
        controller: 'formCtrl'
      })

      .state('button', {
        url: '/ui-elements/button',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/ui-elements/button.html?v='+window.app_version
      })
      .state('card', {
        url: '/ui-elements/card',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/ui-elements/card.html?v='+window.app_version,
        controller: 'cardCtrl'
      })
      .state('components', {
        url: '/ui-elements/components',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/component.html?v='+window.app_version,
        controller: 'componentCtrl'
      })
      .state('chartjs', {
        url: '/charts/chart.js',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/charts/chartjs.html?v='+window.app_version,
        controller: 'ChartCtrl'
      })
      .state('c3chart', {
        url: '/charts/c3chart',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/charts/c3chart.html?v='+window.app_version
      })
      .state('calendar', {
        url: '/calendar',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/calendar.html?v='+window.app_version,
        controller: 'calendarCtrl'
      })
      .state('invoice', {
        url: '/invoice',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/invoice.html?v='+window.app_version
      })
      .state('inbox', {
        url: '/mail/inbox',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/mail/inbox.html?v='+window.app_version,
        controller: 'paperCtrl'
      })
      .state('docs', {
        url: '/docs',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/docs.html?v='+window.app_version,
        controller: 'docsCtrl'
      });
  })

  .factory('AuthInterceptor', function ($rootScope, $q,
                                        AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized,
          419: AUTH_EVENTS.sessionTimeout,
          440: AUTH_EVENTS.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .run(function ($rootScope, AUTH_EVENTS, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (next.url === '/login') {
        return true;
      }
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthService.isAuthenticated()) {
          // user is not allowed
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          // user is not logged in
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    });
  });



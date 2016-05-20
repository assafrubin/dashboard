'use strict';

/**
 * @ngdoc function
 * @name MaterialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of MaterialApp
 */
angular.module('MaterialApp')
  .controller('LoginCtrl', function($scope, $location, $timeout, $q, $rootScope, AUTH_EVENTS, AuthService) {

    $scope.login = function () {
      AuthService.login($scope.user).then(function (user) {
        console.log('login success');
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $location.path('/dashboard/home');
        //$scope.setCurrentUser(user);
      }, function () {
        console.log('login failed');
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };

    $scope.authenticate = function() {
      console.log('ctrl oto');
    	var defer = $q.defer();
    	$timeout(function(){
    		defer.resolve();
    		$timeout(function(){
    		   	$location.path('/dashboard/home');
    		}, 600);
    	}, 1100);
    	return defer.promise;
    }

  });

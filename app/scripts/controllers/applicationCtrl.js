/**
 * Created by Assaf on 5/15/2016.
 */
angular.module('MaterialApp').controller('ApplicationController', function ($scope, $location, USER_ROLES, AUTH_EVENTS, AuthService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  var autoLogout = function() {
    $location.path('/login');
  };

  $scope.$on(AUTH_EVENTS.notAuthenticated, autoLogout);
  $scope.$on(AUTH_EVENTS.sessionTimeout, autoLogout)
});

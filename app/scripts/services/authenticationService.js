angular.module('MaterialApp').factory('AuthService', ['$q', '$http', '$location', 'Session', function ($q, $http, $location, Session) {
  var authService = {};

  //authService.register = function (user) {
  //  return $http
  //    .post('/authenticate', user)
  //    .then(function (res) {
  //      if res.
  //    });
  //};

  authService.login = function (credentials) {
    return $http
      .post('http://' + 'localhost:5115' + '/login', credentials)
      .then(function (res) {
        var deferred = $q.defer();
        console.log(res);
        //wrong credentials
        if (typeof res.data.error !== 'undefined') {
          deferred.reject(res.data.error);
        }
        else {
          Session.create(res.data.id, res.data.user.id,
            res.data.user.role);
          deferred.resolve();
        }
        return deferred.promise;
      });
  };

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
    authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  return authService;
}]);

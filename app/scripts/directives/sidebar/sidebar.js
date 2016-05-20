/**
 * Created by Assaf on 4/7/2016.
 */

/**
 * Created by Assaf on 4/7/2016.
 */
angular.module('MaterialApp')
  .directive('sidebar',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html?v='+window.app_version,
      restrict: 'E',
      replace: true
    }
  });


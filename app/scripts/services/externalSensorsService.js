/**
 * Created by Assaf on 4/2/2016.
 */
angular.module('MaterialApp').factory('externalSensorsService', ['$resource', function ($resource) {
  var exSensors = $resource('http://' + 'localhost:5115' +'/getRecords/:compId?isRandom=true', { full: 'true', compId: '@id' });

  function getExSensorsData() {
    var exSensorsData = exSensors.get({compId: 1});
    return exSensorsData;
  }

  return {
    getExSensorsData: getExSensorsData
  }
}]);

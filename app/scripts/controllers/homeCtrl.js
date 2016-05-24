 'use strict';

/**
 * @ngdoc function
 * @name MaterialApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of MaterialApp
 */
angular.module('MaterialApp').controller('HomeCtrl', ['$scope', '$timeout', '$interval', 'externalSensorsService', function ($scope, $timeout, $interval, externalSensorsService) {
  $scope.sensorsLiveData = {temp: [26,24.1,25.3,25.9,26.7], ph: [5,5.3,5.7,6.2,5.9]};
  $scope.demoLabels = ['0:00', '0:05', '0:10', '0:15', '0:20', '0:25', '0:30'];
  $scope.series = ['Series A', 'Series B'];
  $scope.demoData = [
    [26,24.1,25.3,25.9,26.7],
    [5,5.3,5.7,6.2,5.9]
  ];
  $scope.demoColours = [{
    fillColor: "#8BFD8B",
    strokeColor: "#41F36A",
    pointColor: "#fff",
    pointStrokeColor: "#FFA3FD",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "#FFA3FD",
  },
    {
      fillColor: "#FDCC8B",
      strokeColor: "#F3B841",
      pointColor: "#fff",
      pointStrokeColor: "#F800FC",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#F800FC",
    }
  ];
  $scope.demoOptions = {
    animation: false
  };
  $scope.exSensors = {};
  var time = 35;
  function getExSensorsData() {
    //externalSensorsService.getExSensorsData().$promise.then(function (data) {
    //  $scope.exSensors = data;
    //  $scope.sensorsLiveData.temp.push(data.temp);
    //  $scope.sensorsLiveData.ph.push(data.ph);
    //});
    var ph = Math.floor((5 + Math.random()) * 100)/100;
    var temp = Math.floor((26 + Math.random()) * 100)/100;
    $scope.exSensors.ph = ph;
    $scope.exSensors.temp = temp;
    $scope.demoData[0].push(temp);
    $scope.demoData[1].push(ph);
    $scope.demoLabels.push(Math.floor(time/60) + ':' + (time % 60 < 10 ? ('0' +time %60) : time %60));
    time += 5;
    $scope.sensorsLiveData.ph.push(ph);
  }
  getExSensorsData();
  $interval(getExSensorsData, 5000);

	$scope.options1 = {
	    lineWidth: 8,
	    scaleColor: false,
	    size: 85,
	    lineCap: "square",
	    barColor: "#fb8c00",
	    trackColor: "#f9dcb8"
	};
	$scope.options2 = {
	    lineWidth: 8,
        scaleColor: false,
        size: 85,
        lineCap: "square",
        barColor: "#00D554",
        trackColor: "#c7f9db"
	};
	$scope.options3 = {
	    lineWidth: 8,
        scaleColor: false,
        size: 85,
        lineCap: "square",
        barColor: "#F800FC",
        trackColor: "#F5E5F5"
	};

	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];

	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
	if ($(window).width()<600) {
		$( '.mdl-grid' ).removeAttr('dragula');
	}
	$timeout(function () {
		$scope.line = {
		    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		          data: [
		      [7, 20, 10, 15, 17, 10, 27],
		      [6, 9, 22, 11, 13, 20, 27]
		    ],
		    colours: [{
					fillColor: "#FFA3FD",
		            strokeColor: "#FFA3FD",
		            pointColor: "#fff",
		            pointStrokeColor: "#FFA3FD",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "#FFA3FD",
	        	},
	        	{
	        		fillColor: "#F800FC",
		            strokeColor: "#F800FC",
		            pointColor: "#fff",
		            pointStrokeColor: "#F800FC",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "#F800FC",
	        	}
	        	],
		    options: {
		    	responsive: true,
		            bezierCurve : false,
		            datasetStroke: false,
		            legendTemplate: false,
		            pointDotRadius : 6,
		            showTooltips: false
		    },
		    onClick: function (points, evt) {
		      console.log(points, evt);
		    }

	    };
	}, 100);
    $scope.line2 = {
	    labels: ["JAN","FEB","MAR","APR","MAY","JUN"],
	          data: [
	      [99, 180, 80, 140, 120, 220, 100],
	      [50, 145, 200, 75, 50, 100, 50]
	    ],
	    colours: [{
				fillColor: "rgba(0,0,0, 0)",
	            strokeColor: "#C172FF",
	            pointColor: "#fff",
	            pointStrokeColor: "#8F00FF",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "#8F00FF"
        	},
        	{
        		fillColor: "rgba(0,0,0, 0)",
	            strokeColor: "#FFB53A",
	            pointColor: "#fff",
	            pointStrokeColor: "#FF8300",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "#FF8300"
        	}
        	],
	    options: {
	    	responsive: true,
            bezierCurve : false,
            datasetStroke: false,
            legendTemplate: false,
            pointDotRadius : 9,
            pointDotStrokeWidth : 3,
            datasetStrokeWidth : 3
	    },
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }

    };

}]);

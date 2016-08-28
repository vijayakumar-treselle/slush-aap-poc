'use strict';

var serviceResponse = [];
var serviceResponseKey = [];

application
  .controller('RootController', function ($scope, $cookies, $location, $timeout, $rootScope, $route, $routeParams) {

    /**
     * Reroute the pages based on the path params
     */
    $scope.reRouteTo = function(path) {
      $location.path(path);
    }

    angular.extend( $scope, {

    });

  });

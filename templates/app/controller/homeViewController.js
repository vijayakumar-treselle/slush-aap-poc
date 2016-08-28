'use strict';

/* Home View Controller */
application
  .controller('HomeViewController', function ($scope, $q, $cookies, $rootScope, $routeParams, $route, $controller, $location, CommonUtilityService, WidgetService, WidgetsListDataService) {

    /**
     * Include the Search Widget
     * @param name - Name of the widget
     * @returns {Arrya | Object}
     */
    var petSearchList = WidgetsListDataService.getWidegetData("petsearch");
    $scope.petSearchListData = petSearchList;

    /**
     * Include the Usage metrics controller and clll to track
     * @param name - Current url
     * @returns {String}
     */
    /* Section to call the Usage metrics controller */
    $controller('UsageMetricsController', { $scope: $scope });
    $scope.setusageMetricBasicDetails('search');

  });

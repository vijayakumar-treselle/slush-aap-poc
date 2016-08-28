'use strict';

/* Search Service */
application
  .service('SearchService', function($q, $location, $routeParams, $http, $cookies, CommonUtilityService) {
    return {

      /**
       * This Will get the Pet Family Detail
       * @param paramValue - Input param for API, apiUrl - API url
       * @returns {Array | Object}
       */
      petFamilyList: function(paramValue, apiUrl, onSuccess) {
        $http.get(apiUrl, {
          params: paramValue
        }).success(function(response) {
          var responseData = (angular.isDefined(response.response)) ? response.response : {};
          (onSuccess || angular.noop)(responseData);
        });
      },

      /**
       * This Will get the Pet Color Detail
       * @param paramValue - Input param for API, apiUrl - API url
       * @returns {Array | Object}
       */
      petColorList: function(paramValue, apiUrl, onSuccess) {
        $http.get(apiUrl, {
          params: paramValue
        }).success(function(response) {
          var responseData = (angular.isDefined(response.response)) ? response.response : {};
          (onSuccess || angular.noop)(responseData);
        });
      }

    }
  });
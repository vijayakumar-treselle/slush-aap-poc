'use strict';

/* Services for usage metrics widget */
application
  .service('UsageMetricsService', function($q, $location, $routeParams, $http, CommonUtilityService) {
    return {

      /**
       * This Will get User IP details
       * @param paramValue - Input param for API, apiUrl - API url
       * @returns {Array | Object}
       */
      getUserPublicIp: function(apiUrl, onSuccess) {
         $http.get(apiUrl, {
           params: {}
         }).success(function(signalsResponse) {
           (onSuccess || angular.noop)(signalsResponse);
         });
       },

       /**
        * This Will Track User Activities
        * @param paramValue - Input param for API, apiUrl - API url
        * @returns {Array | Object}
        */
       sendUsageTrackDetails: function(paramValue, apiUrl, onSuccess) {
         $http.get(apiUrl, {
           params: paramValue
         }).success(function(signalsResponse) {
           (onSuccess || angular.noop)(signalsResponse);
         });

         /*var postParams = $.param(paramValue);
         $http({
           method: 'POST',
           url: apiUrl,
           data: postParams,
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           }
         }).success(function (signalsResponse) {
           (onSuccess || angular.noop)(signalsResponse);
         }).error(function () {
           //console.log('Error:'); console.log(arguments);
         });*/

       }

    }
  });
'use strict';

application
  .service('WidgetService', [ '$http', '$q', function ($http, $q) {

    return {

      /* Load Widget JSON data */
      getWidgets: function(param, onSuccess) {
        $http.get('widgets_json', {
          params: {
            type : param
          }
        }).success(function(response) {
          (onSuccess || angular.noop)(response);
        });
      }
    };
  }]);
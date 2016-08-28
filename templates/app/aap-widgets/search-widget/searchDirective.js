'use strict';

/* Search Directive*/
application
  .directive('aapSearch', function() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      controller: 'SearchController',
      // template: '<div id="{{randvalue}}"  >Search Widget{{widgetname}}</div>',
      templateUrl: "views/widget_views/search-widget/search.html",
      link: function (scope, element, attrs) {
      }
    };
  })
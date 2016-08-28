'use strict';

/* AAP Widget Directive */
application
  .directive('aapWidget', function($compile) {

    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function (scope, element, attrs) {
      },
      compile: function (element, attrs,scope) {
        return function(scope,element) {

          /* Aap Widget */
          if(scope.data.widget_type !== '' && scope.data.widget_tag !== '') {
            var x = angular.element('<'+ scope.data.widget_tag +' data="data">Widget</'+ scope.data.widget_tag +'>');
          }

          element.append(x);
          $compile(x)(scope);
        }
      }
    };
  });

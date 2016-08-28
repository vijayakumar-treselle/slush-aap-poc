'use strict';

/* Common Util Directive Comer Here */
application
.directive('repeatDone', function() {

  return function(scope, element, attrs) {
    if(scope.$last) {
      scope.$eval(attrs.repeatDone);
    }
  };

});

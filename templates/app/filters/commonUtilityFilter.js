'use strict';

application
  .filter('joinBy', function () {
    return function (input,delimiter) {
      return (input || []).join(delimiter || ',');
    };
  })

 .filter('groupBy', function() {
   return _.memoize(function(items, field) {
     return _.groupBy(items, field);
   });
});
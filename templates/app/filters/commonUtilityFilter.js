'use strict';

application
  .filter('joinBy', function () {
    return function (input,delimiter) {
      return (input || []).join(delimiter || ',');
    };
  });
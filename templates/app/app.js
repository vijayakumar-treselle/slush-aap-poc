'use strict';

/* Added the below javascript code to improve performance in data binding */
if (jQuery) {
  var originalFn = $.fn.data;
  $.fn.data = function() {
    if (arguments[0] !== '$binding')
    return originalFn.apply(this, arguments);
  }
}

/* variable to initiate the angular app */
var application = angular.module('AdoptapetApp', ['ngRoute', 'ngResource', 'ngCookies']);
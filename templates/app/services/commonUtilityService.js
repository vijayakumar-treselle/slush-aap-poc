'use strict';

application
  .factory('CommonUtilityService', ['$location', '$filter', '$cookies','sitePath','$routeParams','$http', '$rootScope', '$route', 'isSiteDebugMode', function( $location, $filter, $cookies, sitePath, $routeParams, $http, $rootScope, $route, isSiteDebugMode) {

    return {

      /**
       * Get Site Url
       * @returns {String}
       */
      getSiteURL: function() {
        
        if(sitePath == ''){
          var setSitePath = '';
        } else {
          var setSitePath = '/'+sitePath+'/';
        }
        
        var siteUrl = $location.protocol() + '://' + $location.host() + setSitePath;
        return siteUrl;
      },

      /**
       * Get Page View Url
       * @param : page view
       * @returns {String}
       */
      getPageViewUrl: function(page) {
        var pageUrl = this.getSiteURL();

        if(page === 'home_view') {
          pageUrl += '/#/home_view';
        } else {
          pageUrl += '/#/home_view';
        }

        return pageUrl;
      },

      /**
       * This will get as Cookie value
       * @param : Cookie name
       * @returns {Array | Object}
       */
      getCookieValue: function(cookieName) {
        var cookieValue = (angular.isDefined($cookies.get(cookieName))) ? $cookies.get(cookieName) : '';
        return cookieValue;
      },

      /**
       * Set Site Cookie
       * * @param : Cookie name, Cookie value
       * @returns {string|null}
       */
      setSiteCookie: function(cookieName, cookieValue) {
        $cookies.put(cookieName, cookieValue);
      },

      /**
       * This will get as Image path
       * @param : image path
       * @returns {String}
       */
      getImageURL: function(imgSrcValue, imgName, svgToPng) {
        var siteUrl = this.getSiteURL();

        if(svgToPng === 'yes' && imgName != null) {
          imgName = imgName.replace('.svg', '.png');
        }

        if(imgSrcValue == 'small_icon') {
          var imageURLsrc = siteUrl + '/image/' + imgSrcValue + '/' + imgName;
        } else if(imgSrcValue == '') {
          var imageURLsrc = siteUrl + '/image/' + imgName;
        }
        return imageURLsrc;
      },

      /**
       * This will handle Console
       * @param : Console Msg, Console type
       * @returns {String}
       */
      customLogConsole: function(value, consoleType) {
        if(isSiteDebugMode === true) {
          if(consoleType == 'info') {
            console.info(value);
          } else {
            console.log(value);
          }
        }
      },

      /**
       * This will return Site Environment
       * @returns {String}
       */
      getSiteEnv: function() {
        var siteUrl = location.protocol + '://' + location.hostname;
        var environment = '';
        if(siteUrl.indexOf('//www.adoptapet') >= 0) {
          environment = 'prod';
        } else {
          environment = 'dev';
        }
        return environment;
      }

    };
  }]);

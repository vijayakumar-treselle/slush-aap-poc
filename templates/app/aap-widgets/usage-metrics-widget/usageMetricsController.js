'use strict';

/* Controller for Usage Metrics Widget */
application
  .controller('UsageMetricsController', function ($scope, $location, $q, $rootScope, $routeParams, $filter, $cookies, $route, CommonUtilityService, UsageMetricsService, PropertyService) {

    /**
     * Process the Usage Metrics
     * @param name - Url value
     * @returns {String}
     */
    $scope.processUsageMetrics = function(metricsDetail) {
      var deferred = $q.defer();

      $scope.initTrackData().then(function() {
        var currentSection = $route.current.originalPath.replace(/^\//, '').replace(/\/$/, '').split('/')[0];
        $scope.trackData.datetime =  $scope.getTrackTime();

        if(_.size(metricsDetail)) {
          angular.forEach(metricsDetail, function(value, key) {
            $scope.trackData[key] = value;
          });
        }

        var params = { 'params' : JSON.stringify($scope.trackData) };
        var apiUrl = PropertyService.getAPIUrls('siteUsagemetrics');

        UsageMetricsService.sendUsageTrackDetails(params, apiUrl, function(response) {
          /*if($location.$$url != CommonUtilityService.getCookieValue('lastVisitedUrl')) {
            CommonUtilityService.setSiteCookie('lastVisitedUrl', $location.$$url);
          }*/
        });
      });

      deferred.resolve();
      return deferred.promise;
    };

    /**
     * Initialize the track data
     * @returns {Array | Object}
     */
    $scope.initTrackData = function() {
      var deferred = $q.defer();

      if(CommonUtilityService.getCookieValue('usageMetricBasicDetails') !== '') {
        var usageMetDet = JSON.parse(CommonUtilityService.getCookieValue('usageMetricBasicDetails'));
        var page_view = usageMetDet.page_view;
        var pubIp = usageMetDet.publicIp;
      } else {
        var page_view = $scope.page_view;
        var pubIp = $scope.userPublicIp;
      }

      $scope.trackData = {
        'ip': pubIp,
        'module': page_view,
        'user_agent': $scope.getUserAgentDetails(),
        'datetime': $scope.getTrackTime(),
        'action': '',
        'clan_id': ''
      };

      deferred.resolve();
      return deferred.promise;
    };

    /**
     * This will get the Trasker Date an Time detail
     * @returns {Array | Object}
     */
    $scope.getTrackTime = function() {
      var trackDateTimeFormat = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
      return trackDateTimeFormat;
    }

    /**
     * Get the User Agent IP details
     * @returns {Array | Object}
     */
    $scope.getPublicIp = function() {
      var deferred = $q.defer();

      var apiUrl = PropertyService.getAPIUrls('userIpDetail');
      UsageMetricsService.getUserPublicIp(apiUrl, function(result) {
        var userPublicIp = result;
        $scope.userPublicIp = userPublicIp;

        deferred.resolve(userPublicIp);
      });
      return deferred.promise;
    };

    /**
     * Initialize Usage Metrics basic details
     * @param name - Url value
     * @returns {Array | Object}
     */
    $scope.setusageMetricBasicDetails = function(page_view) {
      var deferred = $q.defer();
      var currentSection = $route.current.originalPath.replace(/^\//, '').replace(/\/$/, '').split('/')[0];
      $scope.page_view = page_view;

      $scope.getPublicIp().then(function(pubIp) {
        var usageMetDetails = {'publicIp' : pubIp, 'page_view' : page_view};
        CommonUtilityService.setSiteCookie('usageMetricBasicDetails', angular.toJson(usageMetDetails));
        deferred.resolve();
      });

      return deferred.promise;
    };

    /**
     * This will get User Agent details
     * @returns {Array | Object}
     */
    $scope.getUserAgentDetails = function() {
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var browserName  = navigator.appName;
      var fullVersion  = ''+parseFloat(navigator.appVersion);
      var majorVersion = parseInt(navigator.appVersion,10);
      var nameOffset,verOffset,ix;

      if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {  // In Opera 15+, the true version is after "OPR/" 
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+4);
      } else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {  // In older Opera, the true version is after "Opera" or after "Version"
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+6);
        if ((verOffset=nAgt.indexOf("Version"))!=-1) 
          fullVersion = nAgt.substring(verOffset+8);
      } else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {  // In MSIE, the true version is after "MSIE" in userAgent
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset+5);
      } else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) { // In Chrome, the true version is after "Chrome" 
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset+7);
      } else if ((verOffset=nAgt.indexOf("Safari"))!=-1) { // In Safari, the true version is after "Safari" or after "Version" 
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1) 
          fullVersion = nAgt.substring(verOffset+8);
      } else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) { // In Firefox, the true version is after "Firefox" 
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset+8);
      } else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <  (verOffset=nAgt.lastIndexOf('/')) ) { // In most other browsers, "name/version" is at the end of userAgent 
        browserName = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset+1);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
          browserName = navigator.appName;
         }
      }

      // trim the fullVersion string at semicolon/space if present
      if ((ix=fullVersion.indexOf(";"))!=-1)
        fullVersion=fullVersion.substring(0,ix);
      if ((ix=fullVersion.indexOf(" "))!=-1)
        fullVersion=fullVersion.substring(0,ix);

      majorVersion = parseInt(''+fullVersion,10);
      if (isNaN(majorVersion)) {
        fullVersion  = ''+parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion,10);
      }

      var OSName="Unknown OS";
      if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
      if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
      if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
      if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

      var userAgentDetails = 'Browser name  = ' + browserName + ', Version ' + fullVersion + ',OS = ' + OSName;
      return userAgentDetails;
   };

  });

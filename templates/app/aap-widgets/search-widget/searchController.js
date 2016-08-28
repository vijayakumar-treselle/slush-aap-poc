'use strict';

/* Search Controller */
application
  .controller('SearchController', function ($scope, $location, $q, $rootScope, $filter, $cookies, $routeParams, $route, $controller, CommonUtilityService, SearchService, PropertyService) {
    $scope.siteLocationpath = $location.$$path;

    /**
     * Search Family as Type ahead and Color as drop down
     */
     $scope.defaultSearchFields = {'petFamily' : '', 'petColor' : '', 'petType' : ''};
     $scope.searchFields = angular.fromJson(angular.toJson($scope.defaultSearchFields));
     $scope.colorDetails = [];
     $scope.familyDetails = [];
     $scope.activeSearchTab = [];

     /**
      * Get the Search Tabs
      */
     $scope.clansDetails = PropertyService.getClansDetails();

     /**
      * Get the Search Tabs
      */
     $scope.searchTabs = PropertyService.getSearchTabs();

     /**
      * Get the Pet Type Details
      */
     $scope.petTypeDetails = PropertyService.getPetTypeDetails();

     /**
      * Include the Usage metrics controller and clll to track
      * @param name - Current url
      * @returns {String}
      */
     /* Section to call the Usage metrics controller */
     $controller('UsageMetricsController', { $scope: $scope });

     /**
      * Get the Active Search Tab
      * @returns {Array | Object}
      */
     $scope.getActiveSearchTab = function () {
       var activeTab = {};
       angular.forEach($scope.searchTabs, function(tabs) {
         if(!!tabs.isActive) {
           activeTab = tabs;
         }
       });
       return activeTab;
     };

     // Active Tab
     $scope.activeSearchTab = $scope.getActiveSearchTab();

     /**
      * Get the Active Search Tab
      * @returns {Array | Object}
      */
     $scope.getSearchClans = function () {
       var clansDetails = {'clan_id' : '', 'clan_name' : '', 'family_id' : '', 'color_id' : ''};
       var clanId = '';

       if($scope.activeSearchTab.clan_id === 'others') {
         clanId = $scope.searchFields.petType;
       } else {
         clanId = $scope.activeSearchTab.clan_id;
       }
       clansDetails.clan_id = clanId;

       if(angular.isDefined($scope.clansDetails[clanId])) {
         clansDetails = $scope.clansDetails[clanId];
       }

       return clansDetails;
     };

    /**
     * This will Process the Family
     * @returns {Array | Object}
     */
    $scope.selectSearchTab = function (selectedTab) {
      angular.forEach($scope.searchTabs, function(tabs) {
        tabs.isActive = (tabs.name === selectedTab.name) ? true : false;

        if(!!tabs.isActive) {
          // Reset Search section
          $scope.resetSearch('selectSearchTab');

          $scope.activeSearchTab = angular.fromJson(angular.toJson(tabs));

          if(tabs.clan_id !== 'others') {
            // Call Initialize the Search section
            $scope.initSearch();
          }
        }
      });
    };

    /**
     * This will Process the Family
     * @returns {Array | Object}
     */
    $scope.selectPetType = function () {
      // Reset Search section
      $scope.resetSearch('selectPetType');

      if($scope.searchFields.petType !== '') {
        // Call Initialize the Search section
        $scope.initSearch();
      } else {
        $scope.colorDetails = [];
        $scope.familyDetails = [];
      }
    };

    /**
     * This will get the Family 
     * @returns {Array | Object}
     */
    $scope.getPetFamilyDetails = function () {
      var paramValue = {};
      var apiUrl = PropertyService.getAPIUrls('petsearchFamily');

      var clansDetails = $scope.getSearchClans();
      apiUrl += clansDetails.family_id;

      SearchService.petFamilyList(paramValue, apiUrl, function (responseData) {
        // Process the Per Family to Display
        $scope.processFamilyDetails(responseData);
      });

      // Metrics Tracking
      $scope.processUsageMetricsForSearch('api', apiUrl, clansDetails);
    };

    /**
     * This will get the Family 
     * @returns {Array | Object}
     */
    $scope.getPetColorDetails = function () {
      var paramValue = {};
      var apiUrl = PropertyService.getAPIUrls('petsearchColor');

      var clansDetails = $scope.getSearchClans();
      apiUrl += clansDetails.color_id;

      SearchService.petColorList(paramValue, apiUrl, function (responseData) {
        // Process the Per Color to Display
        $scope.colorDetails = responseData;
      });

      // Metrics Tracking
      $scope.processUsageMetricsForSearch('api', apiUrl, clansDetails);
    };

    /**
     * This will Process the Family 
     * @returns {Array | Object}
     */
    $scope.processFamilyDetails = function (responseData) {
      if(_.size(responseData)) {
        var familyDetails = [];
        angular.forEach(responseData, function(value) {
          familyDetails.push(value.name);
        });
        $scope.familyDetails = familyDetails;

        $("#petFamily").autocomplete({
          source: $scope.familyDetails,
          minLength: 0,
          highlightClass: "bold-text",
        }).focus(function() {
           $(this).autocomplete("search");
        });
      } else {
        // TODO : No Family detail for this Pet
      }
    };

    /**
     * Autocomplete Prototype for Render Items
     */
    $.ui.autocomplete.prototype._renderItem = function (ul, item) {
      item.label = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
      return $("<li></li>")
      .data("item.autocomplete", item)
      .append("<a>" + item.label + "</a>")
      .appendTo(ul);
    };

    /**
     * Initialize the Search section
     */
    $scope.initSearch = function () {
      // Call Pet Family Detail Section
      $scope.getPetFamilyDetails();

      // Call Pet Family Detail Section
      $scope.getPetColorDetails();
    };

    /**
     * Reset Search section
     */
    $scope.resetSearch = function (resetType) {
      $scope.colorDetails = [];
      $scope.familyDetails = [];

      if(resetType !== 'selectPetType') {
        $scope.searchFields = angular.fromJson(angular.toJson($scope.defaultSearchFields));

        if(angular.element('#petType').length) {
          angular.element('#petType').val('');
        }
      }

      if(angular.element('#petFamily').length) {
        angular.element('#petFamily').val('');
      }

      if(angular.element('#petColor').length) {
        angular.element('#petColor').val('');
      }

      /*
      if($('#petFamily').data('autocomplete')) {
        $('#petFamily').autocomplete("destroy");
      }
      */
    };

    /**
     * Search Pet based on the search fields
     */
    $scope.searchForPet = function () {
      var clansDetails = $scope.getSearchClans();

      // Metrics Tracking
      $scope.processUsageMetricsForSearch('search', 'pet search', clansDetails);
    };

    /**
     * Search Pet based on the search fields
     */
    $scope.processUsageMetricsForSearch = function (metricsType, actionApiUrl, clansDetails) {
      var metricsParam = {};
      metricsParam.clan_name = (angular.isDefined(clansDetails) && angular.isDefined(clansDetails.clan_name)) ? clansDetails.clan_name : '';
      metricsParam.clan_id = (angular.isDefined(clansDetails) && angular.isDefined(clansDetails.clan_id)) ? clansDetails.clan_id : '';
      metricsParam.action = (angular.isDefined(actionApiUrl)) ? actionApiUrl : '';

      if(metricsType === 'search') {
        if(angular.element('#petFamily').length) {
          metricsParam.familie_name = angular.element('#petFamily').val();
        }

        if(angular.element('#petColor').length) {
          metricsParam.color_name = angular.element('#petColor').val();
        }
      }

      // Metrics Tracking
      $scope.processUsageMetrics(metricsParam);
    };

    // Call Initialize the Search section
    $scope.initSearch();

  });

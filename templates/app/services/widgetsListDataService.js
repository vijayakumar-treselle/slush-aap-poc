'use strict';

application
  .service('WidgetsListDataService', [function TriggerWidegetService() {
    return {
      /**
       * This will return the Widget Data
       * @param widgetName - Name of the required widget
       * @returns {Arrya | Object}
       */
      getWidegetData: function(widgetName) {
        var listOfWidegets = {
         'siteheader': {
           "widget_name" : "site_header",
           "widget_type" : "site_header",
           "widget_tag" : "aap_header"
         },
         'petsearch': {
           "widget_name" : "petsearch",
           "widget_type" : "petsearch",
           "widget_tag" : "aap_search"
         }
        };

        var widgetDetails = (angular.isDefined(listOfWidegets[widgetName])) ? listOfWidegets[widgetName] : {};
        return widgetDetails;
      }
    };
  }]);
application.config(['$routeProvider', '$httpProvider', '$locationProvider' , function($routeProvider, $httpProvider, $locationProvider) {

  //$locationProvider.html5Mode(true);
  $locationProvider.html5Mode(false);

  /* Section for configuring routes */
  $routeProvider.
    when('/', {
      templateUrl: 'views/home_view.html',
      controller: 'HomeViewController'
    }).
    otherwise({
      redirectTo: '/'
    });

    /* Below section use for all service calls to append the ajax relay file  */
    var matchProtocolInUriRegEx = new RegExp( '^\\w*:?//' );
    var baseUri = 'ajax_relay/ajax_relay.php';
    var apiEndpoint = 'http://54.164.45.232:3000/';

    var currentVersion = 'aap_poc_v1';
    $httpProvider.interceptors.push(function($q) {
      return {
        'request': function(config) {
          var reqIsForTemplate = config.url.indexOf( 'views/' ) === 0,
          reqIsForExternalRes = matchProtocolInUriRegEx.test( config.url );

          if( !( reqIsForTemplate || reqIsForExternalRes ) ) {
            if(config.url === 'getUserIp') {
              config.url = baseUri + '?path=' + encodeURI( config.url ) + encodeURIComponent( '?' + jQuery.param( config.params || {} ) );
            } else {
              if(config.url === 'pets/usage_metrics') {
                config.url = apiEndpoint + encodeURI( config.url ) + ( '?' + jQuery.param( config.params || {} ) );
              } else {
                config.url = apiEndpoint + encodeURI( config.url ) + encodeURIComponent( '?' + jQuery.param( config.params || {} ) );
              }
              //config.url = apiEndpoint + encodeURI( config.url ) + encodeURIComponent( '?' + jQuery.param( config.params || {} ) );
            }

            //config.url = baseUri + '?path=' + encodeURI( config.url ) + encodeURIComponent( '?' + jQuery.param( config.params || {} ) );
            config.params = null;
          } else if(reqIsForTemplate) {
            if(config.url.indexOf('datepicker') === -1) {
              config.url = config.url + "?version=" +currentVersion;
            }
          }
          return config;
        }
      };
    });
  }])

  .run(
    [ '$route','$cookies', 'RouteService','$location',
    function( $route, $cookies, routeService, $location) {
      var resolver = function( route ) {
        return {
          /**
           * Default Resolver
           */

        };
      };

      // Add resolvers to the routes so we can easily reject route requests based on criteria (i.e. auth token is missing or invalid).
      angular.forEach( $route.routes, function( route, path ) {
        if( !route.redirectTo ) {
          $route.routes[ route.originalPath ].resolve = resolver( route );
        }
      });

    }])

  .service(
    'RouteService',
    [ '$route', '$routeParams', '$location', '$cookies', 'CommonUtilityService',
    function( $route, $routeParams, $location, $cookies, utilityService ) {
      angular.extend( this, {
        /**
         * Global tracking section
         */

      });
    }])

  .run(['$rootScope', 'RouteService', '$location' , '$cookies' ,  function(a, c, $location, $cookies) {
    /**
     * Check the Auth Cookie is valid, expired or not
     */

  }]);

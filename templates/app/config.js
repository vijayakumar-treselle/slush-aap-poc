/**
 * Set the Site Debug Mode status, to shown the console
 */
var isSiteDebugMode = true;

/**
 * Function to find and get the Environment detail based on the URL
 * 'Development' & 'Production'
 */

function getDeploymentProfileEnv() {
  var siteUrl = location.protocol + '://' + location.hostname;
  var environment = '';
  if (siteUrl.indexOf('//www.adoptapet') >= 0) {
    environment = 'prod';
  } else {
    environment = 'dev';
  }
  return environment;
}

/**
 * Set the 'Legacy Add User Url'
 */
var getEnv = getDeploymentProfileEnv();

var deploymentProfileEnv = (getEnv == 'prod') ? 'production' : 'development';

application
.constant('sitePath', '')
.constant('DeploymentProfileEnv', deploymentProfileEnv)
.constant('siteEnv', deploymentProfileEnv)
.constant('uriHost', 'adoptapet')
.constant('siteDomainName', 'adoptapet.com')
.constant( 'isSiteDebugMode', isSiteDebugMode);

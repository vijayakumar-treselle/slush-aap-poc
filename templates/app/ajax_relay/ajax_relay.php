<?php

ini_set('max_execution_time', 300); //300 seconds = 5 minutes

ini_set('memory_limit', '2048M');
date_default_timezone_set('America/New_York');

/**
* $endPointArray : Array value includes the endpoints url for various servers like 'Dev' & 'Prod'
* For new environments need to update the below array.
*/
$endPointArray = array(
  'dev' => 'http://54.164.45.232:3000',
  'prod' => 'http://54.164.45.232:3000'
);
$envValue = getDeploymentEnvDetail();
$endPoint = (isset($endPointArray[$envValue])) ? $endPointArray[$envValue] : $endPointArray['dev'];

$params = http_build_query( $_GET );
$params = str_replace('path=', '', $params);
$request = rawurldecode($endPoint.'/'.$_GET[ 'path' ]);
//$request = rawurldecode($endPoint.':'.$_GET[ 'path' ]);

/* Check the End Point is configured, Don't allow it's empty */
if ($endPoint == '') die('No End Point, plz check the service');

if($_GET[ 'path' ] == 'getUserIp?') {
  echo $_SERVER["REMOTE_ADDR"];
  exit;
}

$postMethodServices = array(
  'pets/usage_metrics?',
  'pets/usage_metrics/?'
);

if(in_array($_GET['path'], $postMethodServices)) {

  $curlUrl = $endPoint.'/'.$_GET['path'];
  /*
  $postData = '';
  foreach($_POST as $k => $v) {
    $postData .= $k . '='.$v.'&';
  }
  rtrim($postData, '&');
  */
  $postData = (isset($_POST) && is_array($_POST) && count($_POST)) ? implode($_POST, '&') : [];
  $ch = curl_init();
  curl_setopt($ch,CURLOPT_URL, $curlUrl);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
  curl_setopt($ch,CURLOPT_HEADER, false);
  curl_setopt($ch, CURLOPT_POST, count($postData));
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
  echo $output=curl_exec($ch);
  curl_close($ch); 
  exit;
}

$query_str = parse_url($_GET['path'], PHP_URL_QUERY);
parse_str($query_str, $query_params);

/* Function to get the response from service */
getServiceResponse($request);

/* Function to get the response from service */
function getServiceResponse($request) {
  $ch = curl_init();
  curl_setopt($ch,CURLOPT_URL, $request);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
  $output = curl_exec($ch);
  curl_close($ch);

  responseOutput($output);
  //exit;
}

/* Function to get Deployment Environment */
function getDeploymentEnvDetail() {
  $siteUrl = ((isset($_SERVER['HTTPS'])) ? 'https://' : 'http://').$_SERVER['HTTP_HOST'];
  $env = '';
  if (strpos($siteUrl, '//www.') !== false) {
    $env = 'prod';
  } else {
    $env = 'dev';
  }
  return $env;
}

/* Function to Show the Output of the Response */
function responseOutput($response) {
  // Header
  header( 'Access-Control-Allow-Origin: *' );

  /* add callback method in the output response */
  die( $response );
}

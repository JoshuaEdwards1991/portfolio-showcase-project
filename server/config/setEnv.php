<?php

//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited

//$path = '/Users/joshua.g.edwards/Documents/Repositories/UniCode';
//set_include_path(get_include_path() . PATH_SEPARATOR . $path);

//server version
//define('CONFIGLOCATION', '../../../app/config.xml');

//local version
define('CONFIGLOCATION', '../server/config/config.xml');

//define('BASE_URL', $_SERVER['SERVER_NAME']);
//define('CURRENT_URI', $_SERVER['REQUEST_URI']);

// turn on all possible errors
error_reporting(-1);
// display errors, should be value of 0, in a production system of course
ini_set("display_errors", 0);

session_start();
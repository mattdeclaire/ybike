<?php

if (DEV) {
	$debug = isset($_REQUEST['debug']) ? $_REQUEST['debug'] : false;

	define('DOMAIN', DEV_DOMAIN);
	define('DB_HOST', 'localhost');
	define('DB_NAME', 'ybikes');
	define('DB_USER', 'ybikes');
	define('DB_PASS', 'ybikes');
	define('DEBUG_JSON', $debug == 'json');
} else {
	define('DOMAIN', 'www.ybikes.com');
	define('DB_HOST', 'localhost');
	define('DB_NAME', 'database');
	define('DB_USER', 'username');
	define('DB_PASS', 'password');
	define('DEBUG_JSON', false);
}
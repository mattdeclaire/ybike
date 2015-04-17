<?php

define('DEV_DOMAIN', 'ybikes.dev');

define('ROOT', dirname(__FILE__));
define('CLASSES', ROOT.'/php');
define('VENDOR', ROOT.'/vendor');
define('TEMPLATES', ROOT.'/www/templates');
define('CACHE', ROOT.'/cache');
define('DEV', $_SERVER['HTTP_HOST'] == DEV_DOMAIN);

require ROOT.'/config.php';
require CLASSES.'/functions.php';

spl_autoload_register('autoload');
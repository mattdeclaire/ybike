<?php

function autoload($className) {
	$className = ltrim($className, '\\');
	$fileName  = '';
	$namespace = '';

	if ($lastNsPos = strrpos($className, '\\')) {
		$namespace = substr($className, 0, $lastNsPos);
		$className = substr($className, $lastNsPos + 1);
		$fileName  = str_replace('\\', DIRECTORY_SEPARATOR, $namespace).DIRECTORY_SEPARATOR;
	}

	$fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className).'.php';

	$path = CLASSES.DIRECTORY_SEPARATOR.$fileName;

	if (!file_exists($path)) {
		echo "WARNING: Could not load class $className";
		foreach (debug_backtrace() as $trace) {
			extract(parse_args($trace, array(
				'file' => '',
				'line' => '',
			)));
			echo "$file:$line";
		}
		return false;
	}

	require $path;
}

function parse_args($args, $defaults) {
	foreach ($defaults as $name => $value) {
		if (isset($args[$name])) {
			$defaults[$name] = $args[$name];
		}
	}

	return $defaults;
}

function debug() {
	$trace = debug_backtrace();
	extract($trace[0]);

	echo "<pre style='border: 1px solid #333; background-color: #FFF; padding: 5px; white-space: pre-wrap;'>";
	echo "<strong>$file:$line</strong>";
	foreach (func_get_args() as $arg) {
		echo "\n\n".print_r($arg, true);
	}
	echo "</pre>";
}
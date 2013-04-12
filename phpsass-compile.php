<?php

/**
 * This file is intended to be used in conjunction with Apache2's mod_actions,
 * wherein you can have a .htaccess file like so for automatic compilation:
 *     Action compile-sass /git/phpsass/compile-apache.php
 *     AddHandler compile-sass .sass .scss
 */

header('Content-type: text/css');

require_once './phpsass/SassParser.php';

function warn($text, $context) {
	print "/** WARN: $text, on line {$context->node->token->line} of {$context->node->token->filename} **/\n";
}
function debug($text, $context) {
	print "/** DEBUG: $text, on line {$context->node->token->line} of {$context->node->token->filename} **/\n";
}


$file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PATH_INFO'];
$syntax = substr($file, -4, 4);
$style = isset($_GET['style']) ? $_GET['style'] : 'expanded';
if(!is_string($style) || !in_array($style, array('expanded', 'nested', 'compact', 'compressed'))){
	$style = 'expanded';
}

$options = array(
	'style' => $style,
	'cache' => FALSE,
	'syntax' => $syntax,
	'debug' => TRUE,
	'line_numbers' => TRUE,
	'callbacks' => array(
		'warn' => 'warn',
		'debug' => 'debug'
	),
);

// Execute the compiler.
$parser = new SassParser($options);
try {
	print $parser->toCss($file);
} catch (Exception $e) {
	print $e->getMessage();	
}
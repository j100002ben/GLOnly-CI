<?php

/**
 * This file is intended to be used in conjunction with Apache2's mod_actions,
 * wherein you can have a .htaccess file like so for automatic compilation:
 *     Action compile-sass /git/phpsass/compile-apache.php
 *     AddHandler compile-sass .sass .scss
 */

header('Content-type: text/css');

$cache_path = __DIR__ . '/css/cache/';
$css_file = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PATH_INFO'];
$syntax = substr($css_file, -4, 4);
$style = isset($_GET['style']) ? $_GET['style'] : 'expanded';
if(!is_string($style) || !in_array($style, array('expanded', 'nested', 'compact', 'compressed'))){
	$style = 'expanded';
}
$cache_file  = $cache_path . '/' . md5($_SERVER['PATH_INFO']) . ".{$syntax}.{$style}.css";

$options = array(
	'style' => $style,
	'cache' => TRUE,
	'syntax' => $syntax,
	'debug' => TRUE,
	'line_numbers' => TRUE,
	'callbacks' => array(
		'warn' => 'warn',
		'debug' => 'debug'
	),
);

// Execute the compiler.
try {
	if( $options['cache'] ){
		if( file_modify_time($css_file) > file_modify_time($cache_file) ){
			include './phpsass/SassParser.php';
			$parser = new SassParser($options);
			$css = $parser->toCss($css_file);
			file_put_contents($cache_file, $css);
			echo $css;
		}else{
			echo file_get_contents($cache_file);
		}
	}
} catch (Exception $e) {
	echo $e->getMessage();	
}

function file_modify_time($file_path)
{
	return file_exists($file_path) ? max( @filectime($file_path), @filemtime($file_path) ) : -1;
}

function warn($text, $context)
{
	print "/** WARN: $text, on line {$context->node->token->line} of {$context->node->token->filename} **/\n";
}
function debug($text, $context)
{
	print "/** DEBUG: $text, on line {$context->node->token->line} of {$context->node->token->filename} **/\n";
}
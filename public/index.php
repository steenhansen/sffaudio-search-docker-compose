<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'wp-short-code_theme_functions.php';
$graph_widget = media_graph_component();
echo $graph_widget;
 



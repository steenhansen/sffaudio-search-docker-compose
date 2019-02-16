<?php // functions.php

$wake_up_graphene = file_get_contents('https://sffaudio-search.herokuapp.com/wake-up');

error_reporting(E_ALL);
ini_set('display_errors', 1);


include 'searchInMenu.php';
include 'curlTimeError.php';

include 'function-pdf_table.php';
include 'function-rsd_table.php';
include 'function-podcast_table.php';


include 'function-day_cache.php';       
include 'function-ajax_search.php';
include 'function-graph_view.php';
include 'function-media_list.php';


/**
 * Sparkling functions and definitions
 *
 * @package sparkling
 */

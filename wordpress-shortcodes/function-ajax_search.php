<?php // function-ajax_search.php

const HEROKU_GRAPH_QL_WIDGET_URL = 'https://sffaudio-graph-ql.herokuapp.com/media-radio-lists';

if (!function_exists('ajax_search_component')) {        ///  [ajax_search_component]
    function ajax_search_component()
    {
        $curl_time_error = new SffCurlTimeError();
        $graph_ql_html = $curl_time_error->curlGetContents(HEROKU_GRAPH_QL_WIDGET_URL);;
        return $graph_ql_html;
    }
}

if (!shortcode_exists('ajax_search_component')) {
    add_shortcode('ajax_search_component', ajax_search_component);
}


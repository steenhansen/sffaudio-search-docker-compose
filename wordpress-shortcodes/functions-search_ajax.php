<?php

/*
 
[search_ajax_component]

[graph_search_component]

<div id='search_div' style='margin-top:16px'>...</div>

 
 */

// /home/sffayiao/public_html/wp-content/themes/revolution-code-blue2/functions-search_ajax.php 


//  [search_ajax_component]       instead of [graph_query_component]

define("WP_ACTION_NAME", "ACTION_get_php_work");
define("WP_ACTION_LOGGED_OUT", "wp_ajax_nopriv_" . WP_ACTION_NAME);
define("WP_ACTION_LOGGED_IN", "wp_ajax_" . WP_ACTION_NAME);
define("WP_AJAX_HANDLER_FILE", admin_url('admin-ajax.php'));
define("WP_NONCE_NAME", 'nonce-moniker');


function search_ajax_component2()
{
    $html_js =
        "

<script>

function encodeQueryData(data) {
    return Object.keys(data).map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
}  



function sff_ajax_search(search_container_id, search_for){
    var wp_ajax_url = SFF_AJAX_SEARCH_OBJECT.WP_AJAX_URL;
    
    var data = { 'action': 'ACTION_get_php_work', 
                   '_wpnonce': SFF_AJAX_SEARCH_OBJECT.WP_NONCE, 
                   'search_text': search_for };
    var querystring = encodeQueryData(data);
    var ajax_options = {
       method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
            body: querystring,
        credentials: 'same-origin'
    };
    fetch(wp_ajax_url, ajax_options)
    .then(function(response) {
        return response.json();
    })
    .then(function(search_response) {
        document.getElementById(search_container_id).innerHTML=search_response;
    })
    .catch(function(error) {
        console.log(error)
    });
}
</script>
    ";
    return $html_js;
}


function enqueue_search_ajax()
{
    wp_enqueue_script('search-data-values-to-js', '/wp-content/themes/revolution-code-blue2/js/_empty_.js');
    $data_obj_values = array('WP_AJAX_URL' => WP_AJAX_HANDLER_FILE,
        'WP_NONCE' => wp_create_nonce(WP_NONCE_NAME));
    wp_localize_script('search-data-values-to-js', 'SFF_AJAX_SEARCH_OBJECT', $data_obj_values);
}

function php_ajax_function()
{
 //if (check_ajax_referer(WP_NONCE_NAME, 'nonce')) {
//    if (check_ajax_referer()) {
        $search_text = $_POST['search_text'];
        $query_answer = SffGraphQuery::searchHtml($search_text);
        wp_send_json($query_answer);
   // }
    wp_die();
}

add_action('wp_enqueue_scripts', 'enqueue_search_ajax');
if (is_user_logged_in()) {
    add_action(WP_ACTION_LOGGED_IN, 'php_ajax_function');
} else {
    add_action(WP_ACTION_LOGGED_OUT, 'php_ajax_function');
}


add_shortcode('search_ajax_component2', 'search_ajax_component2');

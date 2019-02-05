<?php

/*

/home/sffayiao/public_html/wp-content/themes/revolution-code-blue2/function-ajax_search.php

in search.php page

[graph_view_component]

[media_list_component]

[ajax_search_component]

 <![CDATA[ 
var SFF_AJAX_SEARCH_OBJECT = {"WP_AJAX_URL":"https:\/\/www.sffaudio.com\/wp-admin\/admin-ajax.php","WP_NONCE":"856a911f1b"};
 ]]> 

 */

define("WP_ACTION_NAME", "ACTION_get_php_work");
define("WP_ACTION_LOGGED_OUT", "wp_ajax_nopriv_" . WP_ACTION_NAME);
define("WP_ACTION_LOGGED_IN", "wp_ajax_" . WP_ACTION_NAME);
define("WP_AJAX_HANDLER_FILE", admin_url('admin-ajax.php'));
define("WP_NONCE_NAME", 'my-nonce-value');
define("DO_A_NONCE_CHECK", 'nonce');

if (!function_exists('ajax_search_component')) {
    function ajax_search_component()
    {
        $html_js = " <script>
function sff_ajax_search(search_container_id, search_for) {

    function encodeQueryData(query_data) {
        return Object.keys(query_data).map(function (key) {
            return [key, query_data[key]].map(encodeURIComponent).join('=');
        }).join('&');
    }

    var ajax_data = {
        'action': 'ACTION_get_php_work',
        '_wpnonce': SFF_AJAX_SEARCH_OBJECT.WP_NONCE,
        'search_text': search_for
    };           
    var query_string = encodeQueryData(ajax_data);
    var ajax_options = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
        body: query_string,
        credentials: 'same-origin'
    };
    var wp_ajax_url = SFF_AJAX_SEARCH_OBJECT.WP_AJAX_URL;
    fetch(wp_ajax_url, ajax_options)
        .then(function (ajax_repsonse) { 
            return ajax_repsonse.json();
        })
        .then(function (html_response) {
            document.getElementById(search_container_id).innerHTML = html_response;
        })
        .catch(function (fetch_error) {
            console.log(fetch_error)
        });
}
</script> ";
        return $html_js;
    }
}

if (!function_exists('ajax_search_enqueueJs')) {
    function ajax_search_enqueueJs()
    {
        wp_enqueue_script('search-data-values-to-js', '/wp-content/themes/revolution-code-blue2/js/_empty_.js');
        $sff_ajax_search_object = array('WP_AJAX_URL' => WP_AJAX_HANDLER_FILE,
            'WP_NONCE' => wp_create_nonce(WP_NONCE_NAME));
        wp_localize_script('search-data-values-to-js', 'SFF_AJAX_SEARCH_OBJECT', $sff_ajax_search_object);
    }
}

if (!function_exists('ajax_search_phpAjaxFunction')) {
    function ajax_search_phpAjaxFunction()
    {
        check_ajax_referer(WP_NONCE_NAME, DO_A_NONCE_CHECK);
        $search_text = $_POST['search_text'];
        $query_answer = SffGraphQuery::searchHtml($search_text);
        wp_send_json($query_answer);
        wp_die();
    }
}


if (!has_action('wp_enqueue_scripts', 'ajax_search_enqueueJs')) {
    add_action('wp_enqueue_scripts', 'ajax_search_enqueueJs');
}

if (!has_action(WP_ACTION_LOGGED_OUT, 'ajax_search_phpAjaxFunction')) {
    add_action(WP_ACTION_LOGGED_OUT, 'ajax_search_phpAjaxFunction');
}

if (!has_action(WP_ACTION_LOGGED_IN, 'ajax_search_phpAjaxFunction')) {
    add_action(WP_ACTION_LOGGED_IN, 'ajax_search_phpAjaxFunction');
}

if (!shortcode_exists('ajax_search_component')) {
    add_shortcode('ajax_search_component', ajax_search_component);
}

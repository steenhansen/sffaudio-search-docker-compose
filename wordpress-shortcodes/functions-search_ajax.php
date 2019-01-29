<?php


// /home/sffayiao/public_html/wp-content/themes/revolution-code-blue2/functions-search_ajax.php 


define("WP_ACTION_NAME",     "ACTION_get_php_work");
define("WP_ACTION_LOGGED_OUT",     "wp_ajax_nopriv_" . WP_ACTION_NAME);
define("WP_ACTION_LOGGED_IN",     "wp_ajax_" . WP_ACTION_NAME);
define("WP_AJAX_HANDLER_FILE",     admin_url( 'admin-ajax.php' )   );
define("WP_AJAX_URL",     admin_url( 'admin-ajax.php' )   );
define("WP_NONCE_NAME",     'aj-demo-nonce');


function search_ajax() {
    $html_js = 
     "<button onclick='sff_ajax_seach(\"dick\")' type='button'>Get 17</button>
     <div id='search_div'>nada</div>

<script>
function sff_ajax_seach(search_for){
    var wp_ajax_url = SFF_AJAX_SEARCH_OBJECT.WP_AJAX_URL;
    var body_vars = 'action=ACTION_get_php_work&_wpnonce=' + SFF_AJAX_SEARCH_OBJECT.WP_NONCE +'&search_text=' + search_for;
    var ajax_options = {
       method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
            body: body_vars,
        credentials: 'same-origin'
    };
    fetch(wp_ajax_url, ajax_options)
    .then(function(response) {
        return response.json();
    })
    .then(function(search_response) {

        document.getElementById('search_div').innerHTML=search_response;
    })
    .catch(function(error) {
        console.log(error)
    });
}
</script>
    ";
    return $html_js;
}


if (!shortcode_exists('search_ajax')) {
    if (function_exists('add_shortcode')) {
        add_shortcode('search_ajax', 'search_ajax');
    }
}




add_action( 'wp_enqueue_scripts', 'enqueue_search_ajax' );

function enqueue_search_ajax() {
   wp_enqueue_script( 'search-data-values-to-js', '_not_a_real_file_.js');
   $data_obj_values =  array(  'WP_AJAX_URL' => WP_AJAX_HANDLER_FILE,
                               'WP_NONCE' => wp_create_nonce(WP_NONCE_NAME)             ) ;
    wp_localize_script( 'search-data-values-to-js', 'SFF_AJAX_SEARCH_OBJECT', $data_obj_values);
}


add_action( WP_ACTION_LOGGED_OUT, 'php_ajax_function' );
add_action( WP_ACTION_LOGGED_IN, 'php_ajax_function' );  

function php_ajax_function() {
    check_ajax_referer(WP_NONCE_NAME, 'nonce' );  
    
    $search_text = $_POST['search_text'];
    
    
      $query_answer =SffGraphQuery::searchHtml($search_text);
    
        wp_send_json($query_answer);
    wp_die();
}

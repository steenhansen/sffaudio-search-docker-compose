<?php





// https://www.sffaudio.com/about/
function media_graph_component() {                                 //  [media-graph-component]
    $graph_desktop = 'https://sffaudio-test-neo4j.herokuapp.com/';
    $graph_html = curl_get_contents($graph_desktop);
    return $graph_html;

}
add_shortcode('media-graph-component', media_graph_component);


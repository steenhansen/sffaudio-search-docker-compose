<?php





// https://www.sffaudio.com/about/
function media_graph_component() {                                 //  [media-graph-component]
    $media_widget = 'https://sffaudio-test-neo4j.herokuapp.com/';

    $get_author = @$_GET['author'];
    $get_book = @$_GET['book'];
    $get_view = @$_GET['view'];
    
    if ($get_book){
        if ($get_view){
            $media_author_book= "$media_widget?book=$get_book&author=$get_author&view=$get_view";
        }else{
            $media_author_book= "$media_widget?book=$get_book&author=$get_author";
        }
    }else if ($get_author){
        if ($get_view){
            $media_author_book= "$media_widget?author=$get_author&view=$get_view";
        }else{
            $media_author_book= "$media_widget?author=$get_author";
        }
    }else{
        $media_author_book= $media_widget;
    }
    
    $graph_html = curl_get_contents($media_author_book);
    $graph_js_html= "<script>
                        window.sff_php_vars={ 
			                'php_url': '$media_widget',
			                'php_author': '$get_author',
			                'php_book': '$get_book'
	                    };
	console.log('******  $media_author_book  *********', '$get_author', '$get_book');
  </script>
  
  $graph_html
  
 ";
    
    return $graph_js_html;

}
add_shortcode('media-graph-component', media_graph_component);


<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


print "php - new";

$media_widget='http://localhost/node/';       //         http://localhost/node/?author=philip_k_dick

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

print "x $get_view y $media_author_book z";


//$media_author_book= "$media_widget?book=$get_book&author=$get_author";
  $media_json = file_get_contents("$media_author_book");
  print "
    <script>
    window.sff_php_vars={ 
			'php_url': '$media_widget',
			'php_author': '$get_author',
			'php_book': '$get_book'
	};
	console.log('******  $media_author_book  *********', '$get_author', '$get_book');
  </script>
  
  $media_json
  
 ";


print "xyz";


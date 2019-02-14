<?php  // searchInMenu.php
/*

    called in 
       /wp-content/themes/sparkling/inc/extras.php
    to add search textbox and button
    
    
    
    if ( ! function_exists( 'sparkling_header_menu' ) ) :
	/ * *
	 * Header menu (should you choose to use one)
	 * /
	function sparkling_header_menu() {
		// display the WordPress Custom Menu if available
	 $menu_txt =	wp_nav_menu(
			array(
				'menu'            => 'primary',
				'theme_location'  => 'primary',
				'container'       => 'div',
				'container_class' => 'collapse navbar-collapse navbar-ex1-collapse',
				'menu_class'      => 'nav navbar-nav',
				'fallback_cb'     => 'WP_Bootstrap_Navwalker::fallback',
				'walker'          => new WP_Bootstrap_Navwalker(),
				'echo' => false
			)
		);
		$ul_str = putSearchIntoEndMenu($menu_txt);
		echo $ul_str; 
	} / * end header menu * /
endif;
    

*/

if ( ! function_exists( 'putSearchIntoEndMenu' ) ) :
    function putSearchIntoEndMenu($menu_txt){	
	    $ul_list = explode('</ul>', $menu_txt);
	    $after_ul = array_pop($ul_list);
	    $before_ul = array_pop($ul_list);
	    $li_form = <<<HTML
		     <li>
				<form role="search" method="post" id="searchform" class="searchform" action="https://www.sffaudio.com/search/">
                    <div>
                        <input type="text" value="" name="search_term" id="search_term" placeholder="Search books & authors" />
                        <input type="submit" id="searchsubmit" value="Search" />
                    </div>
                </form>
            </li>
HTML;
    	$new_before_ul = $before_ul . $li_form; 
	    array_push($ul_list, $new_before_ul);
	    array_push($ul_list, $after_ul);
	    $ul_str = implode('</ul>', $ul_list);
	    return $ul_str; 
    }
endif;

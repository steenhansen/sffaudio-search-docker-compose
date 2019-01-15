

<!--

Code for 
    /home/sffayiao/public_html/wp-content/themes/revolution-code-blue2/header.php
search for "navbarright"   
    
so 
    https://www.sffaudio.com/search/ 
will not page refresh when on enter text into wordPress search in the header  
-->


<form role="search" method="post" id="searchform" class="searchform" 
    action="https://www.sffaudio.com/search/"
    onsubmit="
	    if ( (location.pathname==='/search/') && sff_js_vars){
		    var wp_search_term = document.getElementById('search_term').value;
		    var graph_text_box = document.getElementById('filter--author--text');
		    graph_text_box.value=search_term;
		    sff_js_vars.vars_events.executeSearch(search_term);
	    }else{
		    return true;
	    }
    "  >


   <form role="search" method="post" id="searchform" class="searchform" action="https://www.sffaudio.com/search/">



  <div>
    <label class="screen-reader-text" for="search_term">Search for:</label>
    <input type="text" value="" name="search_term" id="search_term" placeholder="Search books &amp; authors">
    <input type="submit" id="searchsubmit" value="Search">
  </div>
</form>

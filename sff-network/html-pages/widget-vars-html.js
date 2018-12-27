
HoverIcon = rootAppRequire('sff-network/show-nodes/media-nodes/hover-icon');
 var graph_constants = rootAppRequire('sff-network/graph-constants');
 var svg_icons = rootAppRequire('./sff-network/html-pages/svg-icons');
 //var graph_icons = rootAppRequire('./sff-network/html-pages/graph-icons');
// build_widget
function widgetVars(graph_id, nodes_object, edges_object, graph_object) {

var icons_string = HoverIcon.authorIconColors();

    if (nodes_object.length > 10) {
        graph_object.graph_physics = false;
    } else {
        graph_object.graph_physics = {"barnesHut": {"avoidOverlap": 1 }};
    }


//var author_json = {nodes_object, edges_object, graph_object};   // q*bert
//var author_stringified = JSON.stringify(author_json);         // q*bert

    var nodes_string = JSON.stringify(nodes_object, null, ' ');
    var edges_string = JSON.stringify(edges_object, null, ' ');
    var graph_string = JSON.stringify(graph_object, null, ' ');

    var edge_options_json= graph_constants.EDGE_OPTIONS;
    
var edge_options = JSON.stringify(edge_options_json);

var post_proxy_absolute = graph_constants.ROUTE_POST_PROXY + "?absolute_url=";


    var media_html = `
<script>
// server-to-browser
    sff_vars.graph_vars={  
        graph_id:"${graph_id}",
        edge_options:${edge_options},
        node_icons:${icons_string},  
        nodes_string:${nodes_string},
        edges_string:${edges_string},
        graph_info:${graph_string}
}    


sff_vars.pdf_vars={  
        canvas_id:'pdf--canvas'
}    


sff_vars.post_vars={  

        post_proxy:"${post_proxy_absolute}"
}    

</script> `;
    return media_html;
}



function widgetHtml(graph_div_id, author_links, book_links) {
let zoom_in = svg_icons.zoom_in_icon('blue');
let zoom_out = svg_icons.zoom_out_icon('blue');
let get_help = svg_icons.get_help_icon('blue');

    var media_html = `
<style>
  
         #all--filter--authors {
           height:100px; 
         overflow-y:scroll;
         overflow-x:hidden;
           align-items: flex-start;
         display: flex;
          flex-wrap: wrap;
        }
  
                 #all--filter--books {
             height:100px; 
         overflow-y:scroll;
         overflow-x:hidden;
           align-items: flex-start;
         display: flex;
          flex-wrap: wrap;
        }

        
        .book__choice{
		height:44px;
		width: 132px;
		float: left;
		color: black;
	}
	
	.book__choice:hover{
        cursor:pointer;
        color:blue;
        }
	
	.book__article{
		visibility:hidden;
		text-align:center;
		background-color:yellow;
	}
	
	.book__rest{
		height: 1em;
		overflow:hidden;

		 text-decoration: underline    ;
	}

       
       
    

 
    
  
.author__choice  {
    color:black;
    height:32px;
    display:inline-block;
    width:132px;
}  

.author__choice:hover{
    cursor:pointer;
    color:blue;
}





         .auth__first {
         
             font-size:75%;
             width:45%;
            text-align:right;
            display:inline-block;
            vertical-align:middle;
            overflow-x:hidden;
         }
         .auth__last{
            text-decoration: underline;
            font-size:100%;
             width:45%;
            text-align:left;
            display:inline-block;
             
             white-space: nowrap;  
             hyphens: none; 
        }
        
                 .auth__mid{

            font-size:70%;
             width:45%;
            text-align:right;
            display:inline-block;
            visibility: hidden;
            /*  vertical-align: 7px; */
        }
        
 
        .even__author{
              /*  vertical-align: 7px; */
        }
         .odd__author{
             /*  vertical-align: -7px; */
        }
        
        
        
</style>


    <div id="my--network">
      
      
      
      <div id="sff--header" style="text-align: center ;   font-size:  x-large; font-family: Arial, Helvetica, sans-serif;">
        Search SFFaudio's Online Content
        </div>


<div style='background-color:#cccccc'>


<div style="display:flex; height:27px">

        <div style="width:50%; text-align:center;  font-size: larger;"> Authors</div>
        
      
        
        
        <div >
                <span  onclick=" sff_vars.graph_procs.loadAuthorNew('HELP_ALL');" class="info--circle" title="Show Help">
                    <img src="${get_help}" class="control--symbols">
                </span>        
                                   
                <span  onclick="sff_vars.graph_procs.graphSize('+');" class="info--circle" title="Zoom In">
                    <img src="${zoom_in}" class="control--symbols">
                </span>
                            
                <span  onclick="sff_vars.graph_procs.graphSize('-');" class="info--circle" title="Zoom Out">
                    <img src="${zoom_out}" class="control--symbols">
                </span>
        </div>
        
          <div style="width:50%;  text-align:center;   font-size: larger;"> Stories</div>
        
        
</div>        
        
        
        
        
   
        
   
        <div style="float:clear; z-index:3"> 
            
               <div id="all--filter--authors" style="float:left; width:50%;  z-index:3;">
                  <div id='filter--authors' style='display:none;  z-index:3'></div>
                  <div id='all--authors' style='z-index:3'>${author_links}</div>
               </div>
               
               
                        <div id="all--filter--books" style="float:right; width:50%">
            <div id='filter--books' style='display:none'></div>
            <div id='all--books'>${book_links}</div>
         </div>

               
         
        
        </div>
       
        
        
        <script>
        
function chooseIfSingleAuthor(){
     var search_for = document.getElementById('filter--author--text').value;
     var strip_author = sff_vars.filter_names.filterAuthors(search_for);
     if (strip_author!==''){
         sff_vars.graph_procs.loadAuthorNew(strip_author);
         sff_vars.filter_names.selectMedia(strip_author, 'AUTHOR-CHOICE')
         return strip_author;
     }else{
        return false;
     }
}

function chooseIfSingleBook(){
var search_for = document.getElementById('filter--author--text').value;
    var author_book = sff_vars.filter_names.filterStories(search_for);
          if (author_book!==''){
              var strip_author = author_book.strip_author;
              var under_title = author_book.under_title;
              sff_vars.graph_procs.loadBookNew(strip_author, under_title);
              var author_book = strip_author +'::'+under_title;
               sff_vars.filter_names.selectMedia(author_book, 'BOOK-CHOICE')
              var book_object = {strip_author:strip_author, under_title:under_title};
              return book_object;
          }else{
            return false;
          }

}

function inputEnterPress(e){  
   var event = e || window.event;
     var charCode = event.which || event.keyCode;
     var search_for = document.getElementById('filter--author--text').value;
    if (charCode == '13'){
        if (search_for) {
            var strip_author=chooseIfSingleAuthor();
            if (strip_author){
               sff_vars.filter_names.showHideFilteredStories('filtered_media');
            }else{
                  var book_object = chooseIfSingleBook();
                 if (book_object){
                     sff_vars.filter_names.showHideFilteredAuthors('filtered_media');
                 }else{
                      sff_vars.filter_names.nothingFound(sff_vars.NO_SUCH_BOOK);
                 }
            }
        }else{
            sff_vars.filter_names.showHideFilteredStories('all_media');
            sff_vars.filter_names.showHideFilteredAuthors('all_media');
        }
     }
}

function inputSearch(e){  
    var search_for = document.getElementById('filter--author--text').value;
    if (search_for===''){
        search_for='...'; 
        sff_vars.filter_names.stopFilteringAuthors();
        sff_vars.filter_names.stopFilteringStories();
    }else{
        search_for = '"'+ search_for + '"'; 
    }
   var author_button = 'Search authors for\\n' + search_for; 
   var story_button = 'Search stories for\\n' + search_for; 
    document.getElementById('do--author--filter').innerText =author_button;
    document.getElementById('do--story--filter').innerText =story_button;
}

</script> 
       

        
        
        
</div>


 <br>
        <div style="display:flex;">
        
      <button id='do--author--filter'  style=" flex-grow:1;"
                        onClick="
                         var found_author = chooseIfSingleAuthor();
                          sff_vars.filter_names.stopFilteringAuthors();
                          if (!found_author){
                            sff_vars.filter_names.nothingFound(sff_vars.NO_SUCH_AUTHOR);
                          }
            ">Search authors for<br>...</button>        

            <div style=" text-align:center; display:inline-block; flex-grow:0;  width:155px;">                     
                 Search for:<br>
        <input id='filter--author--text' placeholder="search for..." type='text'
          style=""
            onkeypress =" inputEnterPress()  "
            oninput="inputSearch()" />
                        
             </div>  
                    
        <button id='do--story--filter'  style=" flex-grow:1; "
            onClick=" var found_book = chooseIfSingleBook();
                      sff_vars.filter_names.stopFilteringStories();
                      if (!found_book){
                            sff_vars.filter_names.nothingFound(sff_vars.NO_SUCH_BOOK);
                      }
                       "  >Search stories for ...</button>         
                           
               


</div>   


<div >
        <div id='stable-redraw-height'></div>
         <div id="${graph_div_id}"></div>
         <img id='pdf--loading' src='/gifer_com_loader.gif' >
</div>






    </div>

ater div



 `;
    return media_html;
}


module.exports = {widgetVars, widgetHtml} 

var js_loader = rootAppRequire('common-node/html-pages/jsloader-css')

const {MOBILE_START_END} = rootAppRequire('common-node/graph-constants');
var graph_constants = rootAppRequire('common-node/graph-constants')
//var DARK_BACKGROUND = graph_constants.DARK_BACKGROUND;

module.exports = function build_page(nodes_object, edges_object, graph_object, req_query_view, req_query_choice, nodes_and_edges_str, php_search) {
                    return js_loader(nodes_object, edges_object, graph_object, req_query_view, req_query_choice, nodes_and_edges_str, php_search)
        .then(widget_html=> {
            return `<!DOCTYPE html>

<html style="height:100%">
<meta name="viewport" content="width=1024">
<link rel="shortcut icon" href="https://nyc3.digitaloceanspaces.com/sffaudio-usa/graph-search/favicon.ico"  type="image/x-icon" />
<title>Search SffAudio's books and authors</title>
<style>


    body{
        margin: 0px;
    }






/* Galaxy S5 360x640 */
@media only screen 
and (min-device-width: 360px) 
and (max-device-width: 360px) 
and (orientation: portrait) {
    div#all--filter--authors { height: 120px; }
    div#all--filter--books { height: 120px; }
    div#loading--graph { height: 415px; }

    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; } 
}
@media only screen 
and (min-device-width: 640px) 
and (max-device-width: 640px) 
and (orientation: landscape) {
    div#all--filter--authors { height: 75px; }
    div#all--filter--books { height: 75px; }
    div#loading--graph { height: 180px; }

    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }   
    div#search--row { position:absolute; } 
}

/* Pixel 2 411x731 */
@media only screen 
and (min-device-height: 731px) 
and (max-device-height: 731px) 
and (orientation: portrait) {
    div#all--filter--authors { height: 120px; }
    div#all--filter--books { height: 120px; }
    div#loading--graph { height: 506px; }
  
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; } 
    div#search--row { position:absolute; }               
}
@media only screen 
and (min-device-width: 731px) 
and (max-device-width: 731px) 
and (orientation: landscape) {
    div#all--filter--authors { height: 75px; }
    div#all--filter--books { height: 75px; }
    div#loading--graph { height: 231px; }

    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }                   
}

/* Pixel 2 XL 823x411 */
@media only screen 
and (min-device-height: 823px) 
and (max-device-height: 823px) 
and (orientation: portrait) {
    div#all--filter--authors { height: 120px; }
    div#all--filter--books { height: 120px; }
    div#loading--graph { height: 598px; }
    
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }                   
}
@media only screen 
and (min-device-width: 823px) 
and (max-device-width: 823px) 
and (orientation: landscape) {
    div#all--filter--authors { height: 75px; }
    div#all--filter--books { height: 75px; }
    div#loading--graph { height: 231px; }
    
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }               
}

/* iPhone 5/SE 320x568 */
@media only screen 
and (min-device-width: 320px) 
and (max-device-width: 320px) 
and (orientation: portrait) {
    div#all--filter--authors { height: 140px; }
    div#all--filter--books { height: 140px; }
    div#loading--graph { height: 323px; }
    
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }               
}
@media only screen 
and (min-device-width: 568px) 
and (max-device-width: 568px) 
and (orientation: landscape) {
    div#all--filter--authors { height: 75px; }
    div#all--filter--books { height: 75px; }
    div#loading--graph { height: 140px; }
    
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }    
    div#search--row { position:absolute; }               
}
  
/* iPhone 6/7/8 375x667 */
@media only screen 
and (min-device-height: 667px) 
and (max-device-height: 667px) 
and (orientation: portrait) {
    div#all--filter--authors { height: 140px; }
    div#all--filter--books { height: 140px; }
    div#loading--graph { height: 422px; }
    
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }                   
}
@media only screen 
and (min-device-width: 667px) 
and (max-device-width: 667px) 
and (orientation: landscape) {
    div#all--filter--authors { height: 75px; }
    div#all--filter--books { height: 75px; }
    div#loading--graph { height: 195px; }

    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }                   
}

/* iPhone 6/7/8 Plus 414x736 */
@media only screen 
and (min-device-width: 414px) 
and (max-device-width: 414px) 
and (orientation: portrait) {
    div#all--filter--authors { height: 140px; }
    div#all--filter--books { height: 140px; }
    div#loading--graph { height: 491px; }

    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }                   
}
@media only screen 
and (min-device-width: 736px) 
and (max-device-width: 736px) 
and (orientation: landscape) {
    div#all--filter--authors { height: 75px; }
    div#all--filter--books { height: 75px; }
    div#loading--graph { height: 234px; }
  
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; } 
    div#search--row { position:absolute; }                    
}
  
/* iPhone X 375x812 */
@media only screen 
and (min-device-height: 812px) 
and (max-device-height: 812px) 
and (orientation: portrait) { 
    div#all--filter--authors { height: 200px; }
    div#all--filter--books { height: 200px; }
    div#loading--graph { height: 507px; }
    
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }                   
}
@media only screen 
and (min-device-width: 812px) 
and (max-device-width: 812px) 
and (orientation: landscape) { 
    div#all--filter--authors { height: 75px; }
    div#all--filter--books { height: 75px; }
    div#loading--graph { height: 195px; }
    
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; } 
    div#search--row { position:absolute; }                    
}

/* iPad 768x1024 */
@media only screen 
and (min-device-width: 768px) 
and (max-device-width: 768px) 
and (orientation: portrait) { 
    div#all--filter--authors { height: 200px; }
    div#all--filter--books { height: 200px; }
    div#loading--graph { height: 719px; }
    
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }                  
}
@media only screen 
and (min-device-height: 768px) 
and (max-device-height: 768px) 
and (orientation: landscape) { 
    div#all--filter--authors { height: 75px; }
    div#all--filter--books { height: 75px; }
    div#loading--graph { height: 588px; }
    
    ::-webkit-scrollbar { width: 12px !important; }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;}
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px !important;
        border-radius: 10px !important;
        background: #41617D !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;}
    div#my--graph { height: 100%; }
    div#sff--header { height: 30px; }
    div#search--row { height: 43px; }
    div#authors--stories--titles { height: 24px; }  
    div#search--row { position:absolute; }                   
}













  .back-to-sff#back-link{  /* show back link if mobile */
    display: block;
    }


  .at-sff#no-link{  /* hide title if mobile */
    display: none;
    }

</style>

<body style="height:100%;">

${MOBILE_START_END}
<!-- start widget -->
    ${widget_html}
<!-- end widget -->
${MOBILE_START_END}
</body>
</html>

`;
        });
}


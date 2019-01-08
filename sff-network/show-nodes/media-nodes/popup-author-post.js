

var load_css_external = `
// popup-author-post
sff_js_vars.author_post_procs = (function (post_close_svg, post_proxy) {

    var my = {};

    my.historyAuthorPost = function (pdf_url, strip_author, req_query_view, sorted_choice) {
    document.getElementById("my--graph").style.display="none"; 
        if (req_query_view === '') {
            sff_js_vars.history_state.pushAuthor(strip_author);
        } else {
            sff_js_vars.history_state.pushViewAuthor(strip_author, req_query_view, sorted_choice);
        }
        my.startAuthorPost(pdf_url);
    }


    my.setupAuthorPost = function(){}

    my.startAuthorPost = function (pdf_url) {
        sff_js_vars.helpers.setDisplay('close--icon', 'none');
        document.getElementById('close--icon').src = post_close_svg;     /// q*bert
        sff_js_vars.helpers.setDisplay('popup--container', 'block');
        sff_js_vars.helpers.setDisplay('pdf--controller', 'none');
         
            if (sff_php_vars.php_url === 'not a php host') {
                 var proxy_call2 =  '//' + window.location.host + post_proxy + pdf_url; 
            }else{
                var proxy_call2 =  sff_php_vars.php_url + post_proxy + pdf_url; 
            }
        return fetch(proxy_call2)
            .then(function (response) {
                var text_promise = response.text();
                return text_promise;
            })
            .then(function (post_html) {
                document.getElementById("post--container").innerHTML = post_html;
                   document.getElementById("post--container").style.display='block';
                var post_height = document.getElementById("post--container").offsetHeight + 200;
                document.getElementById('popup--container').style.height = post_height + 'px';
                sff_js_vars.blur_procs.blockPage('popup--container');
                
                        ////////////////////////////////////
          var header_height = sff_js_vars.helpers.computedValue("sff--header", "height");
          
           var my_network = document.getElementById("my--network")
           var popup_container = document.getElementById("popup--container")
        
        popup_container.style.top = my_network.style.top  + header_height*1.7;
        popup_container.style.left = my_network.style.left + 20;
        
        popup_container.style.height = '100%' ; //my_network.style.height;
        
        var network_width = sff_js_vars.helpers.computedValue("my--network", "width");
        
        popup_container.style.width = network_width-30;

        
        ////////////////////////////////////
                
                
            });

        sff_js_vars.blur_procs.postPdfWidth('post--container');
    }

    return my;

}(sff_js_vars.graph_vars.node_icons.I_CLOSE_POST.image, sff_js_vars.post_vars.post_proxy))
// popup-author-post end
`;
module.exports = load_css_external; 








module.exports =  function (server_var) {

var load_css_external = `



window.sff_post_procs = (function (post_close_svg, post_proxy) {

    var my = {
        my_var: ${server_var}
    };

    my.loadPost = function (pdf_url,strip_author) {
    
       sff_history_state.pushAuthor(strip_author);
    
    
        sff_helpers.setDisplay('close--icon', 'none');
        document.getElementById('close--icon').src = post_close_svg;     /// q*bert
         sff_helpers.setDisplay('popup--container', 'block');
         

            sff_helpers.setDisplay('pdf--controller', 'none');
            
        var proxy_call = post_proxy + pdf_url;
        fetch(proxy_call)
            .then(function (response) {
                return response.text();
            })
            .then(function (post_html) {
            
                document.getElementById("post--container").innerHTML = post_html;
                var post_height = document.getElementById("post--container").offsetHeight + 200;
                document.getElementById('popup--container').style.height = post_height + 'px';
                 sff_blur_procs.blockPage('popup--container');
            });
       
       
        sff_blur_procs.postPdfWidth('post--container');
    }
    return my;

}( sff_graph_vars.node_icons.I_CLOSE_POST.image, sff_post_vars.post_proxy
)) 







`;
return load_css_external;

}








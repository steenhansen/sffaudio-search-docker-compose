var load_css_external = `
// popup-book-post

sff_vars.book_post_procs = (function (post_close_svg, post_proxy) {

    var my = {};

    my.loadBookPost = function (pdf_url, strip_author, under_title, req_query_view) {
        if (req_query_view) {
            sff_vars.history_state.pushBookView(strip_author, under_title, req_query_view);
        } else {
            sff_vars.history_state.pushBook(strip_author, under_title);
        }
        sff_vars.helpers.setDisplay('close--icon', 'none');
        document.getElementById('close--icon').src = post_close_svg;     /// q*bert
        sff_vars.helpers.setDisplay('popup--container', 'block');
        sff_vars.helpers.setDisplay('pdf--controller', 'none');
         
            if (sff_php_vars.php_url === 'not a php host') {
                 var proxy_call2 =  '//' + window.location.host + post_proxy + pdf_url;
            }else{
                var proxy_call2 =  sff_php_vars.php_url + post_proxy + pdf_url;
            }
        fetch(proxy_call2)
            .then(function (response) {
                return response.text();
            })
            .then(function (post_html) {
                document.getElementById("post--container").innerHTML = post_html;
                var post_height = document.getElementById("post--container").offsetHeight + 200;
                document.getElementById('popup--container').style.height = post_height + 'px';
                sff_vars.blur_procs.blockPage('popup--container');
            });
        sff_vars.blur_procs.postPdfWidth('post--container');
    }
    return my;

}(sff_vars.graph_vars.node_icons.I_CLOSE_POST.image, sff_vars.post_vars.post_proxy))

// popup-book-post end
`;
module.exports = load_css_external; 









var load_css_external = `
// popup-post
sff_vars.post_procs = (function (post_close_svg, post_proxy) {

    var my = {};

    my.loadPost = function (pdf_url, strip_author, req_query_view) {
        if (req_query_view === '') {
            sff_vars.history_state.pushAuthor(strip_author);
        } else {
            sff_vars.history_state.pushAuthorView(strip_author, req_query_view);
        }
        my.loadPostForPodcast(pdf_url);
    }

    my.loadPostForPodcast = function (pdf_url) {
        sff_vars.helpers.setDisplay('close--icon', 'none');
        document.getElementById('close--icon').src = post_close_svg;     /// q*bert
        sff_vars.helpers.setDisplay('popup--container', 'block');
        sff_vars.helpers.setDisplay('pdf--controller', 'none');
         
            if (sff_php_vars.php_url === 'not a php host') {
                 var proxy_call2 =  'http://' + window.location.host + post_proxy + pdf_url; 
                  //console.log('popup-post.js window.location.host===', window.location.host);
                 //  console.log('popup-post.js post_proxy===', post_proxy);
                    //console.log('popup-post.js pdf_url===', pdf_url);
            }else{
                var proxy_call2 =  sff_php_vars.php_url + post_proxy + pdf_url; 
            }
            //console.log('popup-post.js proxy_call2===', proxy_call2);
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
                sff_vars.blur_procs.blockPage('popup--container');
            });

        sff_vars.blur_procs.postPdfWidth('post--container');
    }

    return my;

}(sff_vars.graph_vars.node_icons.I_CLOSE_POST.image, sff_vars.post_vars.post_proxy))
// popup-post end
`;
module.exports = load_css_external; 








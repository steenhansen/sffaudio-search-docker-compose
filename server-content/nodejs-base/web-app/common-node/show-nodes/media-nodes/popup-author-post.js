// popup-author-post
sff_js_vars.author_post_procs = (function (post_close_svg, post_proxy) {

    var my = {};

    my.historyAuthorPost = function (author_post_url, strip_author, req_query_view, sorted_choice) {
        document.getElementById("my--graph").style.display = "none";
        if (req_query_view === '') {
            sff_js_vars.history_state.pushAuthor(strip_author);
        } else {
            sff_js_vars.history_state.pushViewAuthor(strip_author, req_query_view, sorted_choice);
        }
        my.startAuthorPost(author_post_url);
    }

    my.setupAuthorPost = function () {
    }

    my.startAuthorPost = function (author_post_url) {
        sff_js_vars.helpers.busyCursor();
        sff_js_vars.helpers.setDisplayNone('pdf--canvas');
        document.getElementById('close--icon').src = post_close_svg;
        sff_js_vars.helpers.setDisplay('popup--container', 'block');
        sff_js_vars.helpers.setDisplay('pdf--controller', 'none');
        if (sff_php_vars.php_url === 'not a php host') {
            var author_proxy = '//' + window.location.host + post_proxy + author_post_url;
        } else {
            var author_proxy = sff_php_vars.php_url + post_proxy + author_post_url;
        }
        return sff_js_vars.helpers.fetchTimeout(author_proxy, sff_constants.FETCH_WAIT_M_SEC, sff_constants.FETCH_RETRYS)
            .then(function (response) {
                var text_promise = response.text();
                return text_promise;
            })
            .then(function (post_html) {
                document.getElementById("post--container").innerHTML = post_html;
                 sff_js_vars.helpers.overlayCoverScreen();
                sff_js_vars.blur_procs.postPdfWidth('post--container');
                sff_js_vars.helpers.normalCursor();
            })
    }

    return my;

}(sff_js_vars.graph_vars.node_icons.I_CLOSE_POST.image, sff_js_vars.post_vars.post_proxy))










// popup-book-post

sff_js_vars.book_post_procs = (function (post_close_svg, post_proxy) {

    var my = {};

    my.historyBookPost = function (book_post_url, last_first_underscores, under_title, req_query_view, sorted_choice) {
        document.getElementById("my--graph").style.display = "none";
        if (req_query_view) {
            sff_js_vars.history_state.pushViewBook(last_first_underscores, under_title, req_query_view, sorted_choice);
        } else {
            sff_js_vars.history_state.pushBook(last_first_underscores, under_title);
        }
        my.startBookPost(book_post_url);
    }

    my.setupBookPost = function () {
    }

    my.startBookPost = function (book_post_url) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        sff_js_vars.blur_procs.blockPage('popup--container');
        sff_js_vars.helpers.setDisplayNone('pdf--canvas');
        sff_js_vars.helpers.busyCursor();
        document.getElementById("my--graph").style.display = "none";
        sff_js_vars.helpers.setDisplay('close--icon', 'block');
        document.getElementById('close--icon').src = post_close_svg;
        sff_js_vars.helpers.setDisplay('popup--container', 'block');
        sff_js_vars.helpers.setDisplay('pdf--controller', 'none');
        if (sff_php_vars.php_url === 'not a php host') {
            var book_proxy = '//' + window.location.host + post_proxy + book_post_url;
        } else {
            var book_proxy = sff_php_vars.php_url + post_proxy + book_post_url;
        }

        sff_js_vars.helpers.fetchTimeout(book_proxy, sff_constants.FETCH_WAIT_M_SEC, sff_constants.FETCH_RETRYS)
            .then(function (response) {
                return response.text();
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

// popup-book-post end







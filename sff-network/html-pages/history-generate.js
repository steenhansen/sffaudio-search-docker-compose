//history-generate

sff_js_vars.history_generate = (function () {

    function bookPostView(graph_node) {
        return graph_node.group === 'N_BOOK_POST';
    }

    function authorPostView(graph_node) {
        return graph_node.group === 'N_AUTHOR_POST';
    }

    function pdfView(graph_node) {
        return graph_node.group === 'N_PDF';
    }

    function rsdView(graph_node) {
        return graph_node.group === 'N_RSD';
    }

    function podcastView(graph_node) {
        return graph_node.group === 'N_PODCAST';
    }

    var my = {};

    my.bookHistoryView = function (req_query_view, strip_author, under_title, req_query_choice) {
        sff_js_vars.history_state.pushBook(strip_author, under_title);
        if (req_query_view === 'post_book') {
            var book_view = sff_js_vars.graph_vars.nodes_string.find(bookPostView);
            if (book_view) {
                sff_js_vars.book_post_procs.historyBookPost(book_view.goto_url, book_view.strip_author, book_view.under_title, req_query_view, req_query_choice);
            }
        } else if (req_query_view === 'pdf') {
            var pdf_view = sff_js_vars.graph_vars.nodes_string.find(pdfView);
            if (pdf_view) {
                sff_js_vars.pdf_procs.historyPdf(pdf_view.goto_url, pdf_view.book_title, pdf_view.label, pdf_view.last_first_underscores, pdf_view.under_title, req_query_view, req_query_choice);
            }
        } else if (req_query_view === 'rsd') {
            var rsd_view = sff_js_vars.graph_vars.nodes_string.find(rsdView);
            if (rsd_view) {
                var goto_url = rsd_view.goto_url;
                var rsd_description = rsd_view.rsd_description;
                var label = rsd_view.label;
                var rsd_pdf_link = rsd_view.rsd_pdf_link;
                var video_link = rsd_view.video_link;
                var under_title = rsd_view.under_title;
                var last_first_underscores = rsd_view.last_first_underscores;
                sff_js_vars.rsd_procs.historyRsd(goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, last_first_underscores, req_query_view, req_query_choice);
            }
        } else if (req_query_view === 'podcast') {
            var podcast_view = sff_js_vars.graph_vars.nodes_string.find(podcastView);
            if (podcast_view) {
                var goto_url = podcast_view.goto_url;
                var podcast_url = podcast_view.podcast_url;
                var under_title = podcast_view.under_title;
                var last_first_underscores = podcast_view.last_first_underscores;
                sff_js_vars.podcast_procs.historyPodcast(goto_url, podcast_url, under_title, last_first_underscores, req_query_view, req_query_choice);
            }
        }

    }

    my.authorHistoryView = function (req_query_view, strip_author) {
        sff_js_vars.history_state.pushAuthor(strip_author);
        if (req_query_view === 'post_author') {
            var author_view = sff_js_vars.graph_vars.nodes_string.find(authorPostView);
            if (author_view) {
                sff_js_vars.author_post_procs.historyAuthorPost(author_view.goto_url, author_view.strip_author, req_query_view);
            }
        }
    }

    my.startHistoryView = function (req_query_view, strip_author, under_title, req_query_choice) {
        if (sff_php_vars.php_url === 'not a php host') {
            if (under_title) {
                sff_js_vars.history_generate.bookHistoryView(req_query_view, strip_author, under_title, req_query_choice);
            } else if (strip_author) {
                sff_js_vars.history_generate.authorHistoryView(req_query_view, strip_author);
            }
        } else {
            if (sff_php_vars.php_book) {
                sff_js_vars.history_generate.bookHistoryView(req_query_view, sff_php_vars.php_author, sff_php_vars.php_book, req_query_choice);
            } else if (sff_php_vars.php_author) {
                sff_js_vars.history_generate.authorHistoryView(req_query_view, sff_php_vars.php_author);
            }
        }
    }

    return my;

}());
// history-generate end

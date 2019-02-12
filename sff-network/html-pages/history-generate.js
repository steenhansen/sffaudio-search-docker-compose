//history-generate

sff_js_vars.history_generate = (function () {

    function findNodeIndex(graph_node) {
        if (graph_node.group !== this.group_type) {
            return false;
        }
        if (graph_node.sorted_choice != this.req_query_choice) {
            return false;
        }
        return true;
    }

    var my = {};

    my.authorHistoryView = function (req_query_view, strip_author, req_query_choice) {
        sff_js_vars.history_state.pushAuthor(strip_author);
        if (req_query_view === 'post_author') {
            var author_type_index = {group_type: 'N_AUTHOR_POST', req_query_choice: req_query_choice};    // Philip K. Dick
            var author_view = sff_js_vars.graph_vars.nodes_string.find(findNodeIndex, author_type_index);
            if (author_view) {
                sff_js_vars.author_post_procs.historyAuthorPost(author_view.goto_url, strip_author, req_query_view, req_query_choice);
            }
        }
    }

    my.bookHistoryView = function (req_query_view, strip_author, under_title, req_query_choice) {
        sff_js_vars.history_state.pushBook(strip_author, under_title);
        if (req_query_view === 'post_book') {
            var book_type_index = {group_type: 'N_BOOK_POST', req_query_choice: req_query_choice};    // beyond the wub
            var book_view = sff_js_vars.graph_vars.nodes_string.find(findNodeIndex, book_type_index);
            if (book_view) {
                sff_js_vars.book_post_procs.historyBookPost(book_view.goto_url, strip_author, under_title, req_query_view, req_query_choice);
            }
        } else if (req_query_view === 'pdf') {
            var pdf_type_index = {group_type: 'N_PDF', req_query_choice: req_query_choice};
            var pdf_view = sff_js_vars.graph_vars.nodes_string.find(findNodeIndex, pdf_type_index);   // carmilla
            if (pdf_view) {
                sff_js_vars.pdf_procs.historyPdf(pdf_view.goto_url, pdf_view.book_title, pdf_view.label, pdf_view.last_first_underscores,
                    pdf_view.under_title, req_query_view, req_query_choice, pdf_view.pdf_country);
            }
        } else if (req_query_view === 'rsd') {
            var rsd_type_index = {group_type: 'N_RSD', req_query_choice: req_query_choice};
            var rsd_view = sff_js_vars.graph_vars.nodes_string.find(findNodeIndex, rsd_type_index);
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
            var podcast_type_index = {group_type: 'N_PODCAST', req_query_choice: req_query_choice};
            var podcast_view = sff_js_vars.graph_vars.nodes_string.find(findNodeIndex, podcast_type_index);
            if (podcast_view) {
                var goto_url = podcast_view.goto_url;
                var podcast_url = podcast_view.podcast_url;
                var under_title = podcast_view.under_title;
                var last_first_underscores = podcast_view.last_first_underscores;
                sff_js_vars.podcast_procs.historyPodcast(goto_url, podcast_url, under_title, last_first_underscores, req_query_view, req_query_choice);
            }
        }

    }


    my.startHistoryView = function (req_query_view, strip_author, under_title, req_query_choice) {
        if (sff_php_vars.php_url === 'not a php host') {
            if (under_title) {
                sff_js_vars.history_generate.bookHistoryView(req_query_view, strip_author, under_title, req_query_choice);
            } else if (strip_author) {
                sff_js_vars.history_generate.authorHistoryView(req_query_view, strip_author, req_query_choice);
            }
        } else {
            if (sff_php_vars.php_book) {
                sff_js_vars.history_generate.bookHistoryView(req_query_view, sff_php_vars.php_author, sff_php_vars.php_book, req_query_choice);
            } else if (sff_php_vars.php_author) {
                sff_js_vars.history_generate.authorHistoryView(req_query_view, sff_php_vars.php_author, req_query_choice);
            }
        }
    }

    return my;

}());
// history-generate end

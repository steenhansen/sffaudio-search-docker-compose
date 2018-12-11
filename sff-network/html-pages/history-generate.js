// history-generate   
var history_generate = `
//history-generate
sff_vars.history_generate = (function () {

    var my = {};
    
    my.bookHistoryView = function (req_query_view, strip_author, under_title) {

        function bookPostView(graph_node) {
            return graph_node.group === 'L_BOOK_POST';
        }

        function pdfView(graph_node) {
            return graph_node.group === 'L_PDF';
        }

        function rsdView(graph_node) {
            return graph_node.group === 'L_RSD';
        }

        function podcastView(graph_node) {
            return graph_node.group === 'L_PODCAST'; ///last_first_underscores
        }

        sff_vars.history_state.pushBook(strip_author, under_title);
        if (req_query_view === 'post') {
            var book_view = sff_vars.graph_vars.nodes_string.find(bookPostView);                  //  http://localhost:5000/?book=beyond_lies_the_wub&author=philip_k_dick&view=post           
            if (book_view) {
                sff_vars.book_post_procs.loadBookPost(book_view.goto_url, book_view.strip_author, book_view.under_title, req_query_view);
            }
        } else if (req_query_view === 'pdf') {
            var pdf_view = sff_vars.graph_vars.nodes_string.find(pdfView);         //             http://localhost:5000/?book=beyond_lies_the_wub&author=philip_k_dick&view=pdf
            if (pdf_view) {
                sff_vars.pdf_procs.loadPdf(pdf_view.goto_url, pdf_view.book_title, pdf_view.label, pdf_view.last_first_underscores, pdf_view.under_title, req_query_view);
            }
        } else if (req_query_view === 'rsd') {
            var rsd_view = sff_vars.graph_vars.nodes_string.find(rsdView);         //             http://www.sff_test.com/?book=beyond_lies_the_wub&author=philip_k_dick&view=rsd
            if (rsd_view) {
                sff_vars.rsd_procs.loadRsd(rsd_view.goto_url, rsd_view.rsd_description, rsd_view.label, rsd_view.rsd_pdf_link, rsd_view.video_link, rsd_view.under_title, rsd_view.last_first_underscores, req_query_view);
            }
        } else if (req_query_view === 'podcast') {
            var podcast_view = sff_vars.graph_vars.nodes_string.find(podcastView);         //             http://www.sff_test.com/?book=beyond_lies_the_wub&author=philip_k_dick&view=podcast
            if (podcast_view) {
                sff_vars.podcast_procs.loadPodcast(podcast_view.goto_url, podcast_view.podcast_url, podcast_view.under_title, podcast_view.last_first_underscores, req_query_view);
            }
        }

    }

    my.authorHistoryView = function (req_query_view, strip_author) {

        function authorPostView(graph_node) {
            return graph_node.group === 'L_AUTHOR_POST';
        }

        sff_vars.history_state.pushAuthor(strip_author);
        if (req_query_view === 'post') {
            var author_view = sff_vars.graph_vars.nodes_string.find(authorPostView);      //                 http://localhost:5000/?author=philip_k_dick&view=post        
            if (author_view) {
                sff_vars.post_procs.loadPost(author_view.goto_url, author_view.strip_author, req_query_view);
            }
        }
    }

    my.startHistoryView = function (req_query_view, strip_author, under_title) {
        if (sff_php_vars.php_url === 'not a php host') {
            if (under_title) {
                sff_vars.history_generate.bookHistoryView(req_query_view, strip_author, under_title);
            } else if (strip_author) {
                sff_vars.history_generate.authorHistoryView(req_query_view, strip_author);
            }
        } else {
            if (sff_php_vars.php_book) {
                sff_vars.history_generate.bookHistoryView(req_query_view, sff_php_vars.php_author, sff_php_vars.php_book);     //     http://www.sff_test.com?book=beyond_lies_the_wub&author=philip_k_dick&view=post
            } else if (sff_php_vars.php_author) {
                sff_vars.history_generate.authorHistoryView(req_query_view, sff_php_vars.php_author);        ///                 http://www.sff_test.com?author=philip_k_dick&view=post
            }
        }
    }

    return my;

}());
// history-generate end
`;
module.exports = history_generate;

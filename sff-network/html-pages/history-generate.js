// history-generate   
var history_generate = `
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
            return graph_node.group === 'N_PODCAST'; ///last_first_underscores
        }


    var my = {};
    
    my.bookHistoryView = function (req_query_view, strip_author, under_title, req_query_choice) {
        sff_js_vars.history_state.pushBook(strip_author, under_title);
        if (req_query_view === 'post_book') {
            var book_view = sff_js_vars.graph_vars.nodes_string.find(bookPostView);                  //  http://localhost:5000/?book=beyond_lies_the_wub&author=philip_k_dick&view=post           
            if (book_view) {
                sff_js_vars.book_post_procs.historyBookPost(book_view.goto_url, book_view.strip_author, book_view.under_title, req_query_view);
            }
        } else if (req_query_view === 'pdf') {
            var pdf_view = sff_js_vars.graph_vars.nodes_string.find(pdfView);         //             http://localhost:5000/?book=beyond_lies_the_wub&author=philip_k_dick&view=pdf&choice=1
            if (pdf_view) {
                sff_js_vars.pdf_procs.historyPdf(pdf_view.goto_url, pdf_view.book_title, pdf_view.label, pdf_view.last_first_underscores, pdf_view.under_title, req_query_view, req_query_choice);
            }
        } else if (req_query_view === 'rsd') {
            var rsd_view = sff_js_vars.graph_vars.nodes_string.find(rsdView);         //             http://www.sff_test.com/?book=beyond_lies_the_wub&author=philip_k_dick&view=rsd
          
             
            if (rsd_view) {
                sff_js_vars.rsd_procs.historyRsd(rsd_view.goto_url, rsd_view.rsd_description, rsd_view.label, rsd_view.rsd_pdf_link, rsd_view.video_link, rsd_view.under_title, rsd_view.last_first_underscores, req_query_view);
            }
        } else if (req_query_view === 'podcast') {
            var podcast_view = sff_js_vars.graph_vars.nodes_string.find(podcastView);         //             http://www.sff_test.com/?book=beyond_lies_the_wub&author=philip_k_dick&view=podcast
            if (podcast_view) {
                sff_js_vars.podcast_procs.historyPodcast(podcast_view.goto_url, podcast_view.podcast_url, podcast_view.under_title, podcast_view.last_first_underscores, req_query_view,  sorted_choice);
            }
        }

    }

    my.authorHistoryView = function (req_query_view, strip_author) {



        sff_js_vars.history_state.pushAuthor(strip_author);
        if (req_query_view === 'post_author') {
            var author_view = sff_js_vars.graph_vars.nodes_string.find(authorPostView);      //                 http://localhost:5000/?author=philip_k_dick&view=post        
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
                sff_js_vars.history_generate.bookHistoryView(req_query_view, sff_php_vars.php_author, sff_php_vars.php_book, req_query_choice);     //     http://www.sff_test.com?book=beyond_lies_the_wub&author=philip_k_dick&view=post
            } else if (sff_php_vars.php_author) {
                sff_js_vars.history_generate.authorHistoryView(req_query_view, sff_php_vars.php_author);        ///                 http://www.sff_test.com?author=philip_k_dick&view=post
            }
        }
    }

    return my;

}());
// history-generate end
`;
module.exports = history_generate;

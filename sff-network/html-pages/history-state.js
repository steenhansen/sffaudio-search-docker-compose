//history-state
sff_js_vars.history_state = (function (path_name) {

    function typeSortedChoiceFindFactory(_node_type, _sorted_choice) {
        var typeSortedFunction = function (graph_node) {
            if (graph_node.group === _node_type) {
                if (graph_node.sorted_choice === _sorted_choice) {
                    return true;
                }
            }
            return false;
        }
        return typeSortedFunction;
    }

    var my = {};

    my.pushBook = function (strip_author, under_title) {
        var page_type = 't::book';
        var page_query = path_name + '?book=' + under_title + '&author=' + strip_author;
        var author_colons_book = strip_author + sff_constants.AUTHOR_BOOK_SEPARATOR + under_title;
        var url_type = sff_js_vars.ajax_url + sff_js_vars.ROUTE_START_BOOK + strip_author + '/' + under_title;
        statePush(page_type, url_type, author_colons_book, page_query, '', '');
        return url_type;
    };

    my.replaceBook = function (strip_author, under_title) {
        var page_type = 't::book';
        var page_query = path_name + '?book=' + under_title + '&author=' + strip_author;
        var author_colons_book = strip_author + sff_constants.AUTHOR_BOOK_SEPARATOR + under_title;
        var url_type = sff_js_vars.ajax_url + sff_js_vars.ROUTE_START_BOOK + strip_author + '/' + under_title;
        stateReplace(page_type, url_type, author_colons_book, page_query);
        return url_type;
    };

    my.replaceAuthor = function (strip_author) {
        var page_type = 't::author';
        var page_query = path_name + '?author=' + strip_author;
        var url_type = sff_js_vars.ajax_url + '/author/' + strip_author;
        stateReplace(page_type, url_type, strip_author, page_query);
        return url_type;
    };

    stateReplace = function (page_type, url_type, page_name, page_query) {
        var push_state = {
            page_type: page_type,
            url_type: url_type,
            page_name: page_name
        }
        history.replaceState(push_state, "ignored_title", page_query);
    };

    statePush = function (page_type, url_type, page_name, page_query, view_type, sorted_choice) {
        var push_state = {
            page_type: page_type,
            url_type: url_type,
            page_name: page_name,
            view_type: view_type,
            sorted_choice: sorted_choice
        }
        history.pushState(push_state, "ignored_title", page_query);
    };

    my.pushAuthor = function (strip_author) {
        var page_type = 't::author';
        var page_query = path_name + '?author=' + strip_author;
        var url_type = sff_js_vars.ajax_url + '/author/' + strip_author;
        statePush(page_type, url_type, strip_author, page_query, '', '');
        return url_type;
    };

    my.pushViewAuthor = function (strip_author, view_type, sorted_choice) {
        var page_type = 't::author::view';
        var page_query = path_name + '?author=' + strip_author + '&view=' + view_type + '&choice=' + sorted_choice;
        var url_type = sff_js_vars.ajax_url + '/author/' + strip_author + '/' + view_type + '/' + sorted_choice;
        statePush(page_type, url_type, strip_author, page_query, view_type, sorted_choice);
        return url_type;
    };

    my.pushViewBook = function (strip_author, under_title, view_type, sorted_choice) {
    
        var page_type = 't::book::view';
        var page_query = path_name + '?book=' + under_title + '&author=' + strip_author + '&view=' + view_type + '&choice=' + sorted_choice;
        var author_colons_book = strip_author + sff_constants.AUTHOR_BOOK_SEPARATOR + under_title;
        var url_type = sff_js_vars.ajax_url + sff_js_vars.ROUTE_START_BOOK + strip_author + '/' + under_title + '/' + view_type + '/' + sorted_choice;
        statePush(page_type, url_type, author_colons_book, page_query, view_type, sorted_choice);
        return url_type;
    };

    my.popAuthor = function (page_name, url_type) {
        sff_js_vars.graph_procs.network_graph.loadAuthorOrBook(url_type);
        sff_js_vars.filter_names.selectMedia(page_name, 'AUTHOR-CHOICE');
        sff_js_vars.blur_procs.closePopUp();
    }

    my.popViewAuthorPost = function (page_name, sorted_choice) {
        var findAuthorChoice = typeSortedChoiceFindFactory('N_AUTHOR_POST', sorted_choice);
        var author_view = sff_js_vars.graph_vars.nodes_string.find(findAuthorChoice);
        sff_js_vars.filter_names.selectMedia(page_name, 'AUTHOR-CHOICE');
        sff_js_vars.author_post_procs.startAuthorPost(author_view.goto_url);
    }

    my.popBook = function (page_name, url_type) {
        sff_js_vars.graph_procs.network_graph.loadAuthorOrBook(url_type);
        sff_js_vars.filter_names.selectMedia(page_name, 'BOOK-CHOICE');
        sff_js_vars.blur_procs.closePopUp();
    }

    my.popViewBook = function (page_name, url_type, view_type, sorted_choice) {
        sff_js_vars.graph_procs.network_graph.loadAuthorOrBook(url_type);
        sff_js_vars.filter_names.selectMedia(page_name, 'BOOK-CHOICE');
        if (view_type == 'pdf') {
            my.popViewPdf(sorted_choice);
        } else if (view_type == 'post_book') {
            my.popPostViewBook(sorted_choice);
        } else if (view_type == 'rsd') {
            my.popRsdView(sorted_choice);
        } else if (view_type == 'podcast') {
            my.popViewPodcast(sorted_choice);
        }
    }

    my.popViewPdf = function (sorted_choice) {
        var findPdfChoice = typeSortedChoiceFindFactory('N_PDF', sorted_choice);
        var pdf_view = sff_js_vars.graph_vars.nodes_string.find(findPdfChoice);
        sff_js_vars.pdf_procs.startPdf(pdf_view.goto_url, pdf_view.book_title, pdf_view.label);
    }

    my.popPostViewBook = function (sorted_choice) {
        var findBookChoice = typeSortedChoiceFindFactory('N_BOOK_POST', sorted_choice);
        var book_view = sff_js_vars.graph_vars.nodes_string.find(findBookChoice);
        sff_js_vars.book_post_procs.startBookPost(book_view.goto_url);
    }

    my.popRsdView = function (sorted_choice) {
        var findRsdChoice = typeSortedChoiceFindFactory('N_RSD', sorted_choice);
        var rsd_view = sff_js_vars.graph_vars.nodes_string.find(findRsdChoice);
        sff_js_vars.rsd_procs.startRsd(rsd_view.goto_url, rsd_view.rsd_description, rsd_view.label, rsd_view.rsd_pdf_link, rsd_view.video_link, rsd_view.under_title, rsd_view.last_first_underscores);
    }

    my.popViewPodcast = function (sorted_choice) {
        var findPodcastChoice = typeSortedChoiceFindFactory('N_PODCAST', sorted_choice);
        var podcast_view = sff_js_vars.graph_vars.nodes_string.find(findPodcastChoice);
        sff_js_vars.podcast_procs.startPodcast(podcast_view.goto_url, podcast_view.podcast_url);
    }

    my.onPopState = function (event) {
        if (event.state !== null) {
            var page_type = event.state.page_type;
            var url_type = event.state.url_type;
            var page_name = event.state.page_name;
            var sorted_choice = event.state.sorted_choice;
            var view_type = event.state.view_type;
            if (page_type === 't::author') {
                my.popAuthor(page_name, url_type);
            } else if (page_type === 't::author::view') {
                my.popViewAuthorPost(page_name, sorted_choice);
            } else if (page_type === 't::book') {
                my.popBook(page_name, url_type);
            } else if (page_type === 't::book::view') {
                my.popViewBook(page_name, url_type, view_type, sorted_choice);
            }
        }
    };

    return my;

}(sff_js_vars.path_name));
//history-state-end


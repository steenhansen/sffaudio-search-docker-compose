var sff_history_state = `
//history-state
sff_vars.history_state = (function (wp_holding_page) {

    var my = {};

    my.pushBook = function (strip_author, under_title) {
        var page_type = 't::book';
        var page_query = wp_holding_page + '/?book=' + under_title + '&author=' + strip_author;
        var author_colons_book = strip_author + '::' + under_title;
        var url_type = sff_vars.ajax_url + 'author/book/' + strip_author + '/' + under_title;
        statePush(page_type, url_type, author_colons_book, page_query);
        return url_type;
    };

    my.replaceBook = function (strip_author, under_title) {
        var page_type = 't::book';
        var page_query = wp_holding_page + '/?book=' + under_title + '&author=' + strip_author;
        var author_colons_book = strip_author + '::' + under_title;
        var url_type = sff_vars.ajax_url + 'author/book/' + strip_author + '/' + under_title;
        stateReplace(page_type, url_type, author_colons_book, page_query);
        return url_type;
    };

    my.replaceAuthor = function (strip_author) {
        var page_type = 't::author';
        var page_query = wp_holding_page + '/?author=' + strip_author;
        var url_type = sff_vars.ajax_url + 'author/' + strip_author;
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

    statePush = function (page_type, url_type, page_name, page_query) {
        var push_state = {
            page_type: page_type,
            url_type: url_type,
            page_name: page_name
        }
        history.pushState(push_state, "ignored_title", page_query);
    };

    my.pushAuthor = function (strip_author) {
        var page_type = 't::author';
        var page_query = wp_holding_page + '/?author=' + strip_author;
        var url_type = sff_vars.ajax_url + 'author/' + strip_author;
        statePush(page_type, url_type, strip_author, page_query);
        return url_type;
    };

    my.pushAuthorView = function (strip_author, view_type) {
        var page_type = 't::author::view';
        var page_query = wp_holding_page + '/?author=' + strip_author + '&view=' + view_type;
        var url_type = sff_vars.ajax_url + 'author/' + strip_author + '&view=' + view_type;
        statePush(page_type, url_type, strip_author, page_query);
        return url_type;
    };

    my.pushBookView = function (strip_author, under_title, view_type) {
        var page_type = 't::book::view';
        var page_query = wp_holding_page + '/?book=' + under_title + '&author=' + strip_author + '&view=' + view_type;
        var author_colons_book = strip_author + '::' + under_title;
        var url_type = sff_vars.ajax_url + 'author/book/' + strip_author + '/' + under_title + '&view=' + view_type;
        statePush(page_type, url_type, author_colons_book, page_query);
        return url_type;
    };

    my.onPopState = function (event) {
        var page_state = event.state
        if (event.state !== null) {
            var page_type = event.state.page_type;
            var url_type = event.state.url_type;
            var page_name = event.state.page_name;
            if (page_type === 't::author') {
                sff_vars.graph_procs.network_graph.loadAuthorOrBook(url_type);
                sff_vars.filter_names.selectMedia(page_name);
            } else if (page_type === 't::author::view') {

                sff_vars.graph_procs.network_graph.loadAuthorOrBook(url_type);
                sff_vars.filter_names.selectMedia(page_name);
            } else if ((page_type === 't::book') || (page_type === 't::book::view')) {
                sff_vars.graph_procs.network_graph.loadAuthorOrBook(url_type);
                sff_vars.filter_names.selectMedia(page_name);
            }
        }
        sff_vars.blur_procs.closePopUp();
    };

    return my;

}(sff_vars.WP_HOLDING_PAGE));
//history-state-end
`;

module.exports = sff_history_state; 

// vars-events start

window.sff_js_vars = {};

sff_js_vars.vars_events = (function () {

    var my = {};

    my.initVars = function () {
        try {
            var ajax_url = window.sff_php_vars.php_url;
        } catch (err) {
            window.sff_php_vars = {
                "php_url": "not a php host",
                "php_author": "",
                "php_book": "",
                "php_search": ""
            };
            var ajax_url = window.location.origin;
        }
        sff_js_vars.ajax_url = ajax_url;
        sff_js_vars.path_name = window.location.pathname;
    };

    my.resizeFunc = function () {
    }

    my.initEvents = function () {
        window.onpopstate = sff_js_vars.history_state.onPopState;
        window.onkeydown = function (event) {
            sff_js_vars.blur_procs.keyDowns(event)
        };
        window.addEventListener('resize', my.resizeFunc)
    };

    my.inputSearch = function (e) {
        var search_for = document.getElementById('filter--author--text').value;
        if (search_for === '') {
            search_for_text = '...';
            sff_js_vars.filter_names.stopFiltering();
        } else {
            search_for_text = '"' + search_for + '"';
        }
        var author_button = 'Search authors for ' + search_for_text;
        var story_button = 'Search stories for ' + search_for_text;
        document.getElementById('do--author--filter').innerText = author_button;
        document.getElementById('do--story--filter').innerText = story_button;
    }

// NB the first rendering is done by PHP with functions-graph_query.php
    my.wordPressSearch = function (search_for) {
            if (typeof sff_ajax_search === 'function') {
                sff_ajax_search(search_for);
            }
    }

    my.inputEnterPress = function (e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;
        var search_term = document.getElementById('filter--author--text').value;
        if (charCode == '13') {
            if (search_term) {
                my.executeSearch(search_term);
                my.wordPressSearch(search_term);
            } else {
                sff_js_vars.filter_names.showHideFilteredStories('all_media');
                sff_js_vars.filter_names.showHideFilteredAuthors('all_media');
            }
            my.filterResetButton();
        }
    }

    my.filterResetButton = function () {
        document.getElementById('search--for').style.display = 'none';
        document.getElementById('do--reset').style.display = 'block';
    }

    my.executeSearch = function (search_term) {
        var strip_author = my.chooseIfSingleAuthor(search_term);
        if (strip_author) {
            sff_js_vars.filter_names.filterStories(search_term);
            sff_js_vars.filter_names.showHideFilteredStories('filtered_media');
        } else {
            my.bookSearch(search_term)
        }
    }

    my.bookSearch = function (search_term) {
        var book_object = my.chooseIfSingleBook(search_term);
        sff_js_vars.filter_names.showHideFilteredStories('filtered_media');
        if (book_object) {
            my.filterResetButton();
        } else {
            sff_js_vars.filter_names.nothingFound(sff_js_vars.NO_SUCH_BOOK);
        }
    }

    my.filterSearchForText = function () {
        document.getElementById('search--for').style.display = 'block';
        document.getElementById('do--reset').style.display = 'none';
        sff_js_vars.vars_events.inputSearch();
    }

    my.chooseIfSingleAuthor = function (search_term) {
        this.setNotFoundNames(search_term);
        var strip_author = sff_js_vars.filter_names.filterAuthors(search_term);
        if (strip_author !== '') {
            sff_js_vars.graph_procs.loadAuthorNew(strip_author);
            sff_js_vars.filter_names.selectMedia(strip_author, 'AUTHOR-CHOICE')
            sff_js_vars.filter_names.colorAuthors();
            return strip_author;
        } else {
            return false;
        }
    }

    my.setNotFoundNames = function (search_term) {
        var not_found_text = search_term + '" not found.\nSearch for text on Google?';
        sff_js_vars.NO_SUCH_AUTHOR[0].label = 'Author "' + not_found_text;
        sff_js_vars.NO_SUCH_BOOK[0].label = 'Story "' + not_found_text;
        var search_pluses = search_term.replace(' ', '+');
        var google_search = "http://www.google.com/?q=" + search_pluses + "+site%3Awww.sffaudio.com"
        sff_js_vars.NO_SUCH_AUTHOR[0].goto_url = google_search;
        sff_js_vars.NO_SUCH_BOOK[0].goto_url = google_search;
    }

    my.chooseIfSingleBook = function (search_term) {
        this.setNotFoundNames(search_term);
        var author_book = sff_js_vars.filter_names.filterStories(search_term);
        if (author_book !== '') {
            var strip_author = author_book.strip_author;
            var under_title = author_book.under_title;
            sff_js_vars.graph_procs.loadBookNew(strip_author, under_title);
            var author_book = strip_author + sff_constants.AUTHOR_BOOK_SEPARATOR + under_title;
            sff_js_vars.filter_names.selectMedia(author_book, 'BOOK-CHOICE')
            sff_js_vars.filter_names.colorBooks();
            var book_object = {strip_author: strip_author, under_title: under_title};
            return book_object;
        } else {
            return false;
        }
    }

    return my;

}());
// vars-events end


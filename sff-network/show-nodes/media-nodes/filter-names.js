


sff_js_vars.filter_names = (function (graph_id) {

    var my = {
        last_selected_media: ''
    };

    function makeFilters(search_underscore, all_name, filter_name, div_class_name) {
        my.clearFiltered(filter_name);
        var all_div = document.getElementById(all_name);
        var filter_div = document.getElementById(filter_name);
        var all_children = all_div.getElementsByClassName(div_class_name);
        var matching_authors = [];
        for (var i = 0; i < all_children.length; i++) {
            var choice_node = all_children[i];
            var div_id = choice_node.id;
            if (div_id !== '') {
                if (div_id.indexOf(search_underscore) > -1) {
                    var copy_choice = choice_node.cloneNode(true);
                    copy_choice.id = 'filter' + sff_constants.URL_SEPARATOR + copy_choice.id;
                    filter_div.appendChild(copy_choice);
                    var on_click_func = choice_node.onclick;
                    var func_str = on_click_func.toString();
                    var func_array = func_str.split("('");
                    matching_authors.push(func_array[1]);
                }
            }
        }
        return matching_authors;
    }

    my.filterAuthors = function (search_for) {
        var strip_author = '';
        var search_underscore = alphaUnderscore(search_for);
        if (search_underscore === '') {
            my.stopFilteringAuthors();
        } else {
            var author__choice___a__c= sff_constants.AUTHOR__CHOICE___A__C;
         
            var matching_authors = makeFilters(search_underscore, 'all--authors', 'filter--authors', author__choice___a__c);
            

            if (matching_authors.length == 0) {
                my.showHideFilteredAuthors('all_media');
            } else {
                var author_comma = matching_authors[0];
                var func_array = author_comma.split("'");
                var strip_author = func_array[0];
                my.showHideFilteredAuthors('filtered_media');
            }
        }
        return strip_author;
    }
    my.filterStories = function (search_for) {
        var author_book = ''
        var search_underscore = alphaUnderscore(search_for);
        if (search_underscore === '') {
            my.stopFilteringStories()
        } else {
            var book__choice___b__c =sff_constants.BOOK__CHOICE___B__C;
            
            
            var matching_stories = makeFilters(search_underscore, 'all--books', 'filter--books', book__choice___b__c);
            if (matching_stories.length == 0) {
                my.showHideFilteredStories('all_media');
            } else {
                var author_comma_book = matching_stories[0];
                var func_array = author_comma_book.split("'");
                var strip_author = func_array[0];
                var under_title = func_array[2];
                author_book = {strip_author: strip_author, under_title: under_title};
                my.showHideFilteredStories('filtered_media');
            }
        }
        return author_book;
    }

    my.colorAuthors = function () {
        sff_js_vars.filter_names.authorsBooksColor(sff_constants.DARK_BACKGROUND, sff_constants.LIGHT_BACKGROUND)
    }

    my.colorBooks = function () {
        sff_js_vars.filter_names.authorsBooksColor(sff_constants.LIGHT_BACKGROUND, sff_constants.DARK_BACKGROUND)
    }

    my.authorsBooksColor = function (author_color, book_color) {
        document.getElementById('authors--title').style.backgroundColor = author_color;
        document.getElementById('books--title').style.backgroundColor = book_color;
        document.getElementById('all--filter--authors').style.backgroundColor = author_color;
        document.getElementById('all--filter--books').style.backgroundColor = book_color;
    }

    my.clearLast = function () {
        if (my.last_selected_media !== '') {
            var elem = document.getElementById(my.last_selected_media);
            if (elem) {
                elem.classList.remove('current__media');
            }
            var elem_filter = document.getElementById('filter' + sff_constants.URL_SEPARATOR + my.last_selected_media);
            if (elem_filter != null) {
                elem_filter.classList.remove('current__media');
            }
        }

    }

    my.highlightSelection = function (media_id) {
        var elem = document.getElementById(media_id);
        if (elem != null) {
            elem.classList.add('current__media');
            elem.scrollIntoView();
            // var container = document.getElementById(graph_id);
            //container.scrollIntoView();
            var my_network = document.getElementById('my--network');
            my_network.scrollIntoView();
        }
    }

    my.selectMedia = function (media_id_short, author_book_choice) {
        my.clearLast()
        if (author_book_choice === 'BOOK-CHOICE') {
            var author_book_array = media_id_short.split(sff_constants.AUTHOR_BOOK_SEPARATOR);
            var under_title = author_book_array[1];
            var media_id = under_title + sff_constants.END_BOOK_LIST;
        } else {
            var media_id = media_id_short + sff_constants.END_AUTHOR_LIST;
        }
        my.highlightSelection(media_id)
        my.highlightSelection('filter' + sff_constants.URL_SEPARATOR + media_id)
        my.last_selected_media = media_id;
        return true;
    }


     my.clearFiltered =function(container_name) {
        var the_container = document.getElementById(container_name);
        while (the_container.firstChild) {
            the_container.removeChild(the_container.firstChild);
        }
    }

    my.nothingFound = function (no_such_type) {
        sff_js_vars.filter_names.clearLast();
        var nodes_string = no_such_type;
        var edges_string = []
        var graph_physics = {'barnesHut': {'avoidOverlap': 1}};
        var no_php_search = '';
        sff_js_vars.graph_procs.loadGraph('my--graph', nodes_string, edges_string, graph_physics, no_php_search);
    }

    my.stopFilteringAuthors = function () {
        my.showHideFilteredAuthors('all_media');
        my.clearFiltered('filter--authors');
    }

    my.showHideFilteredAuthors = function (showing_type) {
        if (showing_type === 'all_media') {
            sff_js_vars.helpers.setDisplay("all--authors", 'block');
            sff_js_vars.helpers.setDisplay('filter--authors', 'none');
        } else {
            sff_js_vars.helpers.setDisplay("all--authors", 'none');
            sff_js_vars.helpers.setDisplay('filter--authors', 'block');
        }
    }

    my.stopFiltering = function () {
        my.stopFilteringAuthors();
        my.stopFilteringStories()
    }

    my.stopFilteringStories = function () {
        my.showHideFilteredStories('all_media');
        my.clearFiltered('filter--books');
    }

    my.showHideFilteredStories = function (showing_type) {
        if (showing_type === 'all_media') {
            sff_js_vars.helpers.setDisplay("all--books", 'block');
            sff_js_vars.helpers.setDisplay('filter--books', 'none');
        } else {
            sff_js_vars.helpers.setDisplay("all--books", 'none');
            sff_js_vars.helpers.setDisplay('filter--books', 'block');
        }
    }

    function spacesToUrlSeparator(author_title) {
        var underscore_author_title = author_title.replace(/ /g, sff_constants.URL_SEPARATOR);
        return underscore_author_title;
    }

    function stripToLower(csv_string) {
        var lower_csv = csv_string.toLowerCase();
        var lower_stripped = lower_csv.replace(/[^0-9a-z -]/gi, '');
        return lower_stripped.trim();
    }

    function alphaUnderscore(book_or_author) {
        var lower_striped = stripToLower(book_or_author);
        var lower_underscored = spacesToUrlSeparator(lower_striped);
        return lower_underscored;
    }

    return my;

}(sff_js_vars.graph_vars.graph_id))
// filter-names end






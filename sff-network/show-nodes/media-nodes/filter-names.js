

module.exports =  function (URL_SEPARATOR) {

var filter_names = `
// filter-names
sff_vars.filter_names = (function (graph_id) {
    var my = {
        last_selected_media: ''
    };

   my.clearLast = function () {
        if (my.last_selected_media !== '') {
            var elem = document.getElementById(my.last_selected_media);
            if (elem) {
                elem.classList.remove('current__media');
            }
            var elem_filter = document.getElementById('filter' + '${URL_SEPARATOR}' + my.last_selected_media);
            if (elem_filter != null) {
                elem_filter.classList.remove('current__media');
            }
        }
       
    }


    my.selectMedia = function (media_id_short, author_book_choice) {
        my.clearLast()
        if (author_book_choice === 'BOOK-CHOICE'){
            var author_book_array = media_id_short.split('::');
            var under_title = author_book_array[1];
            
          var media_id = under_title + '..';        /// will be ...
        }else{
          var media_id = media_id_short + '__';
        }
        var elem = document.getElementById(media_id);
        if (elem != null) {
            elem.classList.add('current__media');
        }
        var elem_filter = document.getElementById('filter'  + '${URL_SEPARATOR}' + media_id);
        if (elem_filter != null) {
            elem_filter.classList.add('current__media');
        }
        my.last_selected_media = media_id;
        return true;
    }

    function clearFiltered(container_name) {
        var the_container = document.getElementById(container_name);
        while (the_container.firstChild) {
            the_container.removeChild(the_container.firstChild);
        }
    }

 
    function makeFilters(search_underscore, all_name, filter_name, div_class_name) {
        clearFiltered(filter_name);
        var all_div = document.getElementById(all_name);
        var filter_div = document.getElementById(filter_name);
        var all_children = all_div.querySelectorAll(div_class_name);
var number_viewable = 0;
        for (var i = 0; i < all_children.length; i++) {
            var choice_node = all_children[i];
            var div_id = choice_node.id;
            if (div_id !== '') {
                if (div_id.indexOf(search_underscore) > -1) {
                    var copy_choice = choice_node.cloneNode(true);
                    copy_choice.id = 'filter' + '${URL_SEPARATOR}' + copy_choice.id;
                    filter_div.appendChild(copy_choice);
                    number_viewable++;
                    var on_click_func = choice_node.onclick;
                    var func_str = on_click_func.toString();
                    var func_array= func_str.split("'");
                    var last_func_array = func_array;
                }
            }
        }
        if (number_viewable===1){
            return func_array;
        
        }else{
            return '';
        }
    }
    
   my.nothingFound = function (no_such_type) {
         sff_vars.filter_names.clearLast();
         var nodes_string = no_such_type;
         var edges_string =[]
         var graph_physics = {'barnesHut': {'avoidOverlap': 1}};
         sff_vars.graph_procs.loadGraph('my--graph', nodes_string, edges_string,graph_physics);
    }
    
    
//////////////////////////
   my.stopFilteringAuthors = function () {
        my.showHideFilteredAuthors('all_media');
        clearFiltered('filter--authors');
    }
    
     my.showHideFilteredAuthors = function (showing_type) {   // filtered_media / all_media
        if (showing_type === 'all_media') {
            sff_vars.helpers.setDisplay("all--authors", 'block');
            sff_vars.helpers.setDisplay('filter--authors', 'none');
        } else {
            sff_vars.helpers.setDisplay("all--authors", 'none');
            sff_vars.helpers.setDisplay('filter--authors', 'block');
            
            return 17;
        }
    }

    my.filterAuthors = function (search_for) {
        var strip_author='';
        var search_underscore = alphaUnderscore(search_for);
        if (search_underscore === '') {
            my.stopFilteringAuthors();
        } else {
            var func_array = makeFilters(search_underscore, 'all--authors', 'filter--authors', 'div.author__choice');
            if (func_array.length>0){
                var strip_author = func_array[1];
                my.showHideFilteredAuthors('filtered_media');
            }
        }
        return strip_author;
    }

   my.stopFilteringStories = function () {
        my.showHideFilteredStories('all_media');
        clearFiltered('filter--books');
    }
    
     my.showHideFilteredStories = function (showing_type) {   // filtered_media / all_media
        if (showing_type === 'all_media') {
            sff_vars.helpers.setDisplay("all--books", 'block');
            sff_vars.helpers.setDisplay('filter--books', 'none');
        } else {
            sff_vars.helpers.setDisplay("all--books", 'none');
            sff_vars.helpers.setDisplay('filter--books', 'block');
        }
    }

    my.filterStories = function (search_for) {
        var search_underscore = alphaUnderscore(search_for);
        if (search_underscore === '') {
            my.stopFilteringStories()
        } else {
           var func_array= makeFilters(search_underscore, 'all--books', 'filter--books', 'div.book__choice');
           if (func_array.length>3){
            my.showHideFilteredStories('filtered_media');
                   var strip_author = func_array[1];
                   var under_title = func_array[3];
                    var author_book={strip_author:strip_author, under_title:under_title};
                    return author_book;
           }
        }
           return '';
    }
//////////////
    function spacesToUrlSeparator(author_title) {
        var underscore_author_title = author_title.replace(/ /g, '${URL_SEPARATOR}');
        return underscore_author_title;
    }

    function stripToLower(csv_string) {
        var lower_csv = csv_string.toLowerCase();
        var lower_stripped = lower_csv.replace(/[^0-9a-z ]/gi, '');
        return lower_stripped.trim();
    }

    function alphaUnderscore(book_or_author) {
        var lower_striped = stripToLower(book_or_author);
        var lower_underscored = spacesToUrlSeparator(lower_striped);
        return lower_underscored;
    }

    return my;
    
}(sff_vars.graph_vars.graph_id))
// filter-names end
`;
return filter_names;
}
//module.exports = load_css_external; filter_names







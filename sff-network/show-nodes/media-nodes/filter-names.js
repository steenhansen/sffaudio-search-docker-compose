module.exports =  function (server_var) {

var load_css_external = `


window.sff_filter_names = (function (graph_id  ) {
    var my = {
        last_selected_media: '',
         select_colors_or_css_from_server: ${server_var}
    };


   my.selectMedia= function (media_id_short, scroll_media) {
 //  console.log(' my.selectMedia --- media_id_short', media_id_short);
        if (my.last_selected_media !== '') {
            var elem = document.getElementById(my.last_selected_media);
            if (elem) {
                elem.classList.remove('current__media');
            }
                var elem_filter = document.getElementById('filter_'+my.last_selected_media);
                if (elem_filter != null) {
                   elem_filter.classList.remove('current__media');
                }
        }

        var media_id = media_id_short + '_';
        var elem = document.getElementById(media_id);
        
        if (elem != null) {
             elem.classList.add('current__media');
            if (scroll_media == 'yes_scroll') {
                elem.scrollIntoView();
                var container = document.getElementById(graph_id);
                container.scrollIntoView();
            }
        }
         // console.log(' my.selectMedia --- media_id_short', 'filter_'+media_id);
           var elem_filter = document.getElementById('filter_'+media_id);
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

    my.stopFiltering = function () {
        showHideFiltered('all_media');
        clearFiltered('filter--authors');
        clearFiltered('filter--books');
    }
    function makeFilters(search_underscore, all_name, filter_name, div_class_name) {
        clearFiltered(filter_name);
        var all_div = document.getElementById(all_name);
        var filter_div = document.getElementById(filter_name);
        var all_children = all_div.querySelectorAll(div_class_name);
        for (var i = 0; i < all_children.length; i++) {
            var choice_node = all_children[i]
            var div_id = choice_node.id;
            if (div_id !== '') {
                if (div_id.indexOf(search_underscore) > -1) {
                    var copy_choice = choice_node.cloneNode(true);
                    copy_choice.id = 'filter_' + copy_choice.id;
                    filter_div.appendChild(copy_choice);
                }
            }
        }
    }

    function showHideFiltered(showing_type) {   // filtered_media / all_media
        if (showing_type === 'all_media') {
             sff_helpers.setDisplay("all--authors", 'block');
             sff_helpers.setDisplay("all--books", 'block');
             sff_helpers.setDisplay('filter--authors', 'none');
             sff_helpers.setDisplay('filter--books', 'none');
        } else {
             sff_helpers.setDisplay("all--authors", 'none');
             sff_helpers.setDisplay("all--books", 'none');
             sff_helpers.setDisplay('filter--authors', 'block');
             sff_helpers.setDisplay('filter--books', 'block');
        }
    }

    my.filterMedia = function (filter_elem) {
        var search_for = filter_elem.value;
        var search_underscore = alphaUnderscore(search_for);
        if (search_underscore === '') {
            my.stopFiltering()
        } else {
            makeFilters(search_underscore, 'all--authors', 'filter--authors', 'div.author__choice');
            makeFilters(search_underscore, 'all--books', 'filter--books', 'div.book__choice');
            showHideFiltered('filtered_media');
        }
    }


    function spacesToUnderscore(author_title) {
        var underscore_author_title = author_title.replace(/ /g, '_');
        return underscore_author_title;
    }

    function stripToLower(csv_string) {
        var lower_csv = csv_string.toLowerCase();
        var lower_stripped = lower_csv.replace(/[^0-9a-z ]/gi, '');
        return lower_stripped.trim();
    }

    function alphaUnderscore(book_or_author) {
        var lower_striped = stripToLower(book_or_author);
        var lower_underscored = spacesToUnderscore(lower_striped);
        return lower_underscored;
    }

  
    
    return my;
}(sff_graph_vars.graph_id)) 






`;
return load_css_external;

}







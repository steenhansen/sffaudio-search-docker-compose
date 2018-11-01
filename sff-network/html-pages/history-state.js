module.exports = function (node_server) {


    var sff_history_state = `
      <script>
            window.sff_history_state = (function () {
        
            var my = {  
                node_server: '${node_server}'
                };

            statePush = function (page_type, url_type, page_name, page_query) {
              //  var url_type = window.location.host + url_type;               /// q*bert   this reloads window
                    //var url_type = my.node_server + 'author/'+page_name;
                var push_state = {
                    page_type: page_type,
                    url_type: url_type,
                    page_name: page_name
                }
                history.pushState(push_state, "ignored_title", page_query);  
  
            };

//  http://localhost/node/author/philip_k_dick    is the json stuff
            my.pushAuthor = function (strip_author) {
                 var page_type = 't::author';
                 var page_query = '/?author='+strip_author;
                   var url_type = my.node_server + 'author/'+strip_author;
                 statePush(page_type, url_type, strip_author, page_query);
                // var url_type2 =  my.node_server + 'author/' + strip_author ;
                 return url_type;
            };

            my.pushBook = function (strip_author, under_title) {
                var page_type = 't::book';
                var page_query = '/?book='+under_title;
                var author_colons_book = strip_author + '::' + under_title;
                   var url_type = my.node_server + 'author/book/' + strip_author + '/' + under_title;
                statePush(page_type, url_type, author_colons_book, page_query);
                //var url_type2 =  my.node_server + 'author/book/' + strip_author + '/' + under_title;
                return url_type;
            };

            my.onPopState = function (event) {
//                console.log('window.onpopstate', event)
                var page_state = event.state
                if (event.state !== null) {
                    var page_type = event.state.page_type;
                    var url_type = event.state.url_type;
                    var page_name = event.state.page_name;
                    if (page_type === 't::author') {
                      //  console.log('onPopState', url_type)
                        sff_graph_procs.network_graph.loadNew(url_type);
                        sff_filter_names.selectMedia(page_name);
                    } else if (page_type === 't::book') {
                        sff_graph_procs.network_graph.loadNew(url_type);
                        sff_filter_names.selectMedia(page_name);
                    }
                }
                sff_blur_procs.closePopUp();
            };
        
            return my;
        
        }()); 
     </script>
    `;
    return sff_history_state;

}


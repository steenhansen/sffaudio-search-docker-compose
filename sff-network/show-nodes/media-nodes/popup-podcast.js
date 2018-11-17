module.exports =  function (server_var) {

var load_css_external = `
//popup-podcast
sff_vars.podcast_procs = (function (podcast_close_svg) {
    var my = {
        my_var: ${server_var}
    };

    my.loadPodcast = function (goto_url, podcast_url, under_title, strip_author, req_query_view) {
        if (req_query_view) {
            sff_vars.history_state.pushBookView(strip_author, under_title, req_query_view);
        } else {
            sff_vars.history_state.pushBook(strip_author, under_title);
        }
         sff_vars.helpers.setDisplay('downlod--mp3', 'block');
        sff_vars.helpers.setDisplay('pdf--controller', 'none');
        document.getElementById('media--title').innerHTML = '';
        sff_vars.blur_procs.blockPage('popup--container');
        sff_vars.blur_procs.mp3load(goto_url);
        
        
        
        sff_vars.post_procs.loadPostForPodcast(podcast_url)
        .then(  ()=>{ 
            document.getElementById("post--container").style.display='block';
            var media_height =sff_vars.helpers.computedHeight('mp3--player');
            var pager_height =sff_vars.helpers.computedHeight('post--container');
            var pop_cont_height = media_height + pager_height;
            document.getElementById("popup--container").style.height = pop_cont_height + 'px';      
        } )
        document.getElementById('close--icon').src = podcast_close_svg;
    }

    return my;

}(sff_vars.graph_vars.node_icons.I_CLOSE_PODCAST.image))

//popup-podcast end
`;
return load_css_external;

}











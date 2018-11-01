module.exports =  function (server_var) {

var load_css_external = `





window.sff_podcast_procs = (function (podcast_close_svg) {
    var my = {
            my_var: ${server_var}
    };


    my.loadPodcast = function (goto_url, podcast_url, under_title, strip_1_author) {

    sff_history_state.pushBook(strip_1_author, under_title);

        sff_helpers.setDisplay('pdf--controller', 'none');
             
       
        document.getElementById('media--title').innerHTML = '';
        sff_blur_procs.blockPage('popup--container');
        sff_blur_procs.mp3load(goto_url);
        sff_post_procs.loadPost(podcast_url);
        document.getElementById('close--icon').src = podcast_close_svg;
    }

    return my;

}(sff_graph_vars.node_icons.I_CLOSE_PODCAST.image)) 







`;
return load_css_external;

}











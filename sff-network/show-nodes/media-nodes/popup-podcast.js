

var load_css_external = `
//popup-podcast
sff_js_vars.podcast_procs = (function (podcast_close_svg) {

    var my = {
        podcast_mp3: ''
    };

    my.downloadMp3 = function () {
        window.location = this.podcast_mp3;
    }

    my.historyPodcast = function (goto_url, podcast_post_url, under_title, strip_author, req_query_view, sorted_choice) {
        document.getElementById("my--graph").style.display = "none";
        if (req_query_view) {
            sff_js_vars.history_state.pushViewBook(strip_author, under_title, req_query_view, sorted_choice);
        } else {
            sff_js_vars.history_state.pushBook(strip_author, under_title);
        }
        my.startPodcast(goto_url, podcast_post_url)
    }

    my.startPodcast = function (goto_url, podcast_post_url) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        sff_js_vars.blur_procs.blockPage('popup--container');
        sff_js_vars.helpers.setDisplay('download--podcast--mp3', 'block');
        sff_js_vars.helpers.setDisplay('pdf--controller', 'none');
        document.getElementById('media--title').innerHTML = '';
        sff_js_vars.blur_procs.mp3load(goto_url);
        this.podcast_mp3 = goto_url;
        sff_js_vars.author_post_procs.startAuthorPost(podcast_post_url)
            .then(function () {
                document.getElementById("post--container").style.display = 'block';
                var media_height = sff_js_vars.helpers.computedHeight('mp3--player');
                var pager_height = sff_js_vars.helpers.computedHeight('post--container');
                var pop_cont_height = media_height + pager_height;
                document.getElementById("popup--container").style.height = pop_cont_height + 'px';
            })
        document.getElementById('close--icon').src = podcast_close_svg;
    }

    return my;

}(sff_js_vars.graph_vars.node_icons.I_CLOSE_PODCAST.image))

//popup-podcast end
`;
module.exports = load_css_external; 











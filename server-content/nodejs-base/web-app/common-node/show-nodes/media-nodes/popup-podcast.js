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
        var resolved_podcast_url = my.decodeUrl(goto_url);
        sff_js_vars.blur_procs.mp3load(resolved_podcast_url);
        sff_js_vars.author_post_procs.startAuthorPost(podcast_post_url)
            .then(function () {
                document.getElementById("post--container").style.display = 'block';
                sff_js_vars.helpers.overlayCoverScreen();
            })
        document.getElementById('close--icon').src = podcast_close_svg;
    }


    my.decodeUrl = function (before_htaccess_url) {
        var url_array = before_htaccess_url.split('/');
        var file_name = url_array.pop();
        var canadian_podcasts = ['SFFaudioPodcast440.mp3']; // 'The Uninvited' by Dorothy Macardle
        if (canadian_podcasts.includes(file_name)){
            var after_htaccess_url = 'http://sffaudiomediacan.s3.amazonaws.com/canadianpodcasts/' + file_name;
        } else {
            var after_htaccess_url = 'https://nyc3.digitaloceanspaces.com/sffaudio-usa/podcasts/' + file_name;
        }
        this.podcast_mp3 = after_htaccess_url;
        return after_htaccess_url;
    }

    return my;

}(sff_js_vars.graph_vars.node_icons.I_CLOSE_PODCAST.image))

//popup-podcast end












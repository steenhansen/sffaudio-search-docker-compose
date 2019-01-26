//popup-rsd
sff_js_vars.rsd_procs = (function (rsd_close_svg) {

    var my = {
        rsd_mp3: ''
    };

    my.downloadMp3 = function () {
        window.location = this.rsd_mp3;
    }

    my.videoEmbed = function (video_link) {
        if (video_link.indexOf('archive.org') > 0) {
            var archive_arr = video_link.split('/download/');
            var archive_rest = archive_arr[1];
            var rest_arr = archive_rest.split('/');
            var archive_id = rest_arr[0];
            var archive_embed = "//archive.org/embed/" + archive_id;
            return archive_embed;
        } else if (video_link.indexOf('youtube.com') > 0) {
            var youtube_arr = video_link.split('?v=');
            var youtube_id = youtube_arr[1];
            var youtube_embed = "//youtube.com/embed/" + youtube_id;
            return youtube_embed;
        }
        return '';
    }

    my.historyRsd = function (goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, last_first_underscores, req_query_view, sorted_choice) {
        document.getElementById("my--graph").style.display = "none";
        if (!sff_js_vars.helpers.detectIE()) {
            if (req_query_view) {
                sff_js_vars.history_state.pushViewBook(last_first_underscores, under_title, req_query_view, sorted_choice);
            } else {
                sff_js_vars.history_state.pushBook(last_first_underscores, under_title);
            }
        }
        my.startRsd(goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, last_first_underscores)
    }

    my.startRsd = function (goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, last_first_underscores) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        sff_js_vars.blur_procs.blockPage('popup--container');
        sff_js_vars.helpers.setDisplay('media--title', 'block');
        if (video_link !== '') {
            var video_embed = my.videoEmbed(video_link);
            my.loadVideo(video_embed, label, rsd_description, under_title, last_first_underscores);
        } else {
            sff_js_vars.helpers.setDisplay("video--container", 'none');
            sff_js_vars.pdf_procs.startPdf(rsd_pdf_link, label, rsd_description, last_first_underscores, under_title);
        }
        document.getElementById('close--icon').src = rsd_close_svg;
        sff_js_vars.helpers.setDisplay('post--container', 'none');

        var resolved_rsd_url = my.decodeUrl(goto_url);
        sff_js_vars.blur_procs.mp3load(resolved_rsd_url);
        sff_js_vars.helpers.setDisplay('download--rsd--mp3', 'block');
    }

    my.decodeUrl = function (before_htaccess_url) {
        var url_array = before_htaccess_url.split('/');
        var file_name = url_array.pop();
        var after_htaccess_url = 'https://nyc3.digitaloceanspaces.com/sffaudio-usa/rsd-podcasts/' + file_name;
        this.rsd_mp3 = after_htaccess_url;
        return after_htaccess_url;
    }


// under_title, last_first_underscores are unused below
    my.loadVideo = function (video_embed, book_title, label, under_title, last_first_underscores) {
        sff_js_vars.helpers.setDisplay("media--title", 'block');
        document.getElementById('close--icon').src = rsd_close_svg;
        document.getElementById('media--title').innerHTML = book_title + ' - ' + label;
        sff_js_vars.helpers.setDisplay('pdf--loading', 'block');
        sff_js_vars.helpers.setDisplay('pdf--loading', 'none');
        document.getElementById('video--player').src = video_embed;
        sff_js_vars.helpers.setDisplay("video--container", 'block');
    }

    return my;

}(sff_js_vars.graph_vars.node_icons.I_CLOSE_RSD.image))
//popup-rsd end




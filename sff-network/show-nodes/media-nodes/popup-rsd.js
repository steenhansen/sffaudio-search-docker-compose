


var load_css_external = `
//popup-rsd
sff_vars.rsd_procs = (function (rsd_close_svg) {

    var my = {
        rsd_mp3: ''

    };

    my.downloadMp3 = function (){
       window.location = this.rsd_mp3;
       //console.log('rsd', this.rsd_mp3)
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

    my.loadRsd = function (goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, strip_author, req_query_view) {
        if (req_query_view) {
            sff_vars.history_state.pushBookView(strip_author, under_title, req_query_view);
        } else {
            sff_vars.history_state.pushBook(strip_author, under_title);
        }
        sff_vars.helpers.setDisplay('media--title', 'block');
        if (video_link !== '') {
            var video_embed = my.videoEmbed(video_link);
            my.loadVideo(video_embed, label, rsd_description, under_title, strip_author);
        } else {
            sff_vars.helpers.setDisplay("video--container", 'none');
            sff_vars.pdf_procs.loadPdfForRsd(rsd_pdf_link, label, rsd_description, strip_author, under_title);
        }
        this.rsd_mp3=goto_url;
        document.getElementById('close--icon').src = rsd_close_svg;
        sff_vars.blur_procs.blockPage('popup--container');
        sff_vars.helpers.setDisplay('post--container', 'none');
        sff_vars.blur_procs.mp3load(goto_url);
            sff_vars.helpers.setDisplay('download--rsd--mp3', 'block');
    }

    my.loadVideo = function (video_embed, book_title, label, under_title, strip_author) {
     
        sff_vars.helpers.setDisplay("media--title", 'block');
        document.getElementById('close--icon').src = rsd_close_svg;
        document.getElementById('media--title').innerHTML = book_title + ' - ' + label;
        sff_vars.blur_procs.blockPage('popup--container');
        sff_vars.helpers.setDisplay('pdf--loading', 'block');
        sff_vars.helpers.setDisplay('pdf--loading', 'none');
        document.getElementById('video--player').src = video_embed;
        sff_vars.helpers.setDisplay("video--container", 'block');
    }

    return my;

}(sff_vars.graph_vars.node_icons.I_CLOSE_RSD.image)) 
//popup-rsd end

`;
module.exports = load_css_external; 

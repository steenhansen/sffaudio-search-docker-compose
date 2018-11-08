
module.exports =  function (server_var) {

var load_css_external = `

 sff_vars.rsd_procs = (function (rsd_close_svg) {

    var my = {
        my_var: ${server_var}
    };
    
    my.videoEmbed = function (video_link){
    //console.log('video_link', video_link);
        if (video_link.indexOf('archive.org')>0){
            var archive_arr = video_link.split('/download/');
            var archive_rest = archive_arr[1];
            var rest_arr = archive_rest.split('/');
            var archive_id = rest_arr[0];
            var archive_embed = "https://archive.org/embed/" + archive_id;
            return archive_embed;
        }else if (video_link.indexOf('youtube.com')>0){
      //  console.log('youtube', video_link);
            var youtube_arr = video_link.split('?v=');
            var youtube_id = youtube_arr[1];
            var youtube_embed = "https://youtube.com/embed/" + youtube_id;
            return youtube_embed;
        }
        return '';
    }

    my.loadRsd = function (goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, strip_author) {
             
   console.log('loadRsd pdf ==',goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, strip_author)
        sff_vars.helpers.setDisplay('media--title', 'block');
        if (video_link!==''){
          var video_embed = my.videoEmbed(video_link);
          my.loadVideo(video_embed, label, rsd_description, under_title, strip_author);
        }else{
            sff_vars.helpers.setDisplay("video--container", 'none');
            sff_vars.pdf_procs.loadPdf(rsd_pdf_link, label, rsd_description, strip_author, under_title);
        }
        document.getElementById('close--icon').src = rsd_close_svg; 
        sff_vars.blur_procs.blockPage('popup--container');
         sff_vars.helpers.setDisplay('post--container', 'none');
        sff_vars.blur_procs.mp3load(goto_url);
    }

    my.loadVideo = function (video_embed, book_title, label,under_title, strip_author) {
        sff_vars.history_state.pushBook(strip_author, under_title);
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

`;
return load_css_external;

}


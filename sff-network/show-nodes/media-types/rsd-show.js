

MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')

module.exports = function (graph_db) {

    class RsdData extends MediaShow {


        constructor(node_id, db_version, rsd_title, rsd_url, rsd_pdf_link, rsd_description, video_link, under_title, strip_author) {
            super(node_id, db_version, rsd_title, rsd_url);
             this.goto_url = rsd_url;
               
                 this.rsd_pdf_link = rsd_pdf_link;
                 this.rsd_description = rsd_description;
                  this.video_link = video_link;
                  this.under_title = under_title;
                  this.strip_author = strip_author;
                  if (video_link==='') {
                      this.node_type = 'L_RSD';
                  }else{
                      this.node_type = 'L_RSD_VIDEO';
                  
                  }
                     this.title = 'hover title rsd';
        }



    }
    return RsdData;

}




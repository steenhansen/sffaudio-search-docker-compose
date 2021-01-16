

HoverIcon = rootAppRequire('common-node/show-nodes/media-nodes/hover-icon')

module.exports = function (graph_db) {

    class RsdData extends HoverIcon {


        constructor(node_id, db_version, rsd_title, rsd_url, rsd_pdf_link, rsd_description, video_link, under_title, last_first_underscores, rsd_count) {
            super(node_id, db_version, rsd_title, rsd_url);
             this.goto_url = rsd_url;
               
                 this.rsd_pdf_link = rsd_pdf_link;
                 this.rsd_description = rsd_description;
                  this.video_link = video_link;
                  this.under_title = under_title;
                  this.last_first_underscores = last_first_underscores;
                  if (video_link==='') {
                      this.node_type = 'L_RSD';
                  }else{
                      this.node_type = 'L_RSD_VIDEO';
                  
                  }
                     this.title = 'Click to listen & read';
                     this.sorted_choice = rsd_count;
        }



    }
    return RsdData;

}




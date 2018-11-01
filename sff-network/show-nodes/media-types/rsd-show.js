

MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')

module.exports = function (graph_db) {

    class RsdData extends MediaShow {


        constructor(node_id, db_version, rsd_title, rsd_url, rsd_pdf_link, rsd_description) {
            super(node_id, db_version, rsd_title, rsd_url);
             this.goto_url = rsd_url;
                 this.node_type = 'L_RSD';
                 this.rsd_pdf_link = rsd_pdf_link;
                 this.rsd_description = rsd_description;
        }



    }
    return RsdData;

}




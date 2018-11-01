
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')

module.exports = function (graph_db) {

    class PdfData extends MediaShow {
        constructor(node_id, db_version, pdf_title, book_title, under_title, pdf_url, strip_1_author, strip_2_author) {
           super(node_id, db_version, pdf_title, under_title);
           this.book_title = book_title;
           this.under_title = under_title;
           this.goto_url = pdf_url;
            this.strip_1_author = strip_1_author;
            this.strip_2_author = strip_2_author;
              this.sorted_label = pdf_url;
                  this.node_type = 'L_PDF';
    }



    }
    return PdfData;

}




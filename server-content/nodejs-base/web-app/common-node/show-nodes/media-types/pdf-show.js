HoverIcon = rootAppRequire('common-node/show-nodes/media-nodes/hover-icon')

module.exports = function (graph_db) {

    class PdfData extends HoverIcon {

        constructor(node_id, db_version, pdf_title, book_title, under_title, pdf_url, last_first_underscores, pdf_country, pdf_count) {
            super(node_id, db_version, pdf_title, under_title);
            this.book_title = book_title;
            this.under_title = under_title;
            this.goto_url = pdf_url;
            this.last_first_underscores = last_first_underscores;
            this.sorted_label = pdf_url;
            this.node_type = 'L_PDF';
            this.pdf_country=pdf_country;
               this.title = "Click for story's PDF";
               this.sorted_choice = pdf_count;
        }

    }
    return PdfData;

}




MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')

module.exports = function (graph_db) {

    class PdfData extends MediaShow {

        constructor(node_id, db_version, pdf_title, book_title, under_title, pdf_url, last_first_underscores, pdf_country) {
            super(node_id, db_version, pdf_title, under_title);
            this.book_title = book_title;
            this.under_title = under_title;
            this.goto_url = pdf_url;
            this.last_first_underscores = last_first_underscores;
            this.sorted_label = pdf_url;
            this.node_type = 'L_PDF';
            this.pdf_country=pdf_country;
        }

    }
    return PdfData;

}




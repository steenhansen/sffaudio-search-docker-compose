var graph_constants = rootAppRequire('common-node/graph-constants')
MediaBuild = rootAppRequire('common-node/build-nodes/media-types/media-build')
MultipleMonikers = rootAppRequire('common-node/multiple-monikers');
var multiple_monikers = new MultipleMonikers();

module.exports = function (build_repository) {

    class PdfBuild extends MediaBuild {

        static pdfLinkInfo(pdf_link, pdf_pages, pdf_country, pdf_info) {
            if (pdf_link === '') {
                return '';
            }
            let new_info;
            const new_link = graph_constants.MEDIA_LINK_DIR + pdf_link;
            if (pdf_info === '') {
                new_info = `${pdf_pages} Pages`;
            } else {
                new_info = `${pdf_info}`;
            }
            if ('Canada' === pdf_country) {
                new_info = `${new_info} Can`;
            }
            return {new_link, new_info};
        }

        static pdfRead(pdf_csv) {
            let pdf_descriptions = [];
            let pdf_books = {};
            let pdf_authors = {};
            for (let pdf_object of pdf_csv) {
                var story_wiki = pdf_object['story link on wikipedia'];
                var author_wiki = pdf_object['author wikipedia entry'];
                var book_title = pdf_object['book title'];
                var pdf_country = pdf_object['pdf country 1'];
                var pdf_data_1 = PdfBuild.pdfLinkInfo(pdf_object['pdf link 1'], pdf_object['pdf page count 1'], pdf_object['pdf country 1'], pdf_object['pdf info 1']);
                var pdf_data_2 = PdfBuild.pdfLinkInfo(pdf_object['pdf link 2'], pdf_object['pdf page count 2'], pdf_object['pdf country 2'], pdf_object['pdf info 2']);
                var pdf_data_3 = PdfBuild.pdfLinkInfo(pdf_object['pdf link 3'], pdf_object['pdf page count 3'], pdf_object['pdf country 3'], pdf_object['pdf info 3']);
                var pdf_data_4 = PdfBuild.pdfLinkInfo(pdf_object['pdf link 4'], pdf_object['pdf page count 4'], pdf_object['pdf country 4'], pdf_object['pdf info 4']);
                multiple_monikers.parseNames(pdf_object['book author']);                 /////////
                var last_first_underscores = multiple_monikers.lastUnderscore();
                var {esc_book_title, under_title} =MediaBuild.quoteUnderscoreTitle(pdf_object['book title'])
                var title_with_authors = multiple_monikers.titleWithAuthors(under_title);         //////
                var underScoreToNormal = multiple_monikers.underScoreToNormal();
                var small_pdf = {
                    title_with_authors,
                    last_first_underscores,
                    book_title,
                    esc_book_title,
                    under_title,
                    story_wiki,
                    author_wiki,
                    pdf_data_1,
                    pdf_data_2,
                    pdf_data_3,
                    pdf_data_4,
                    pdf_country
                };
                pdf_books[title_with_authors] = {esc_book_title, under_title, last_first_underscores};
                pdf_descriptions.push(small_pdf);
                for (var strip_author in underScoreToNormal) {
                    var normal_author = underScoreToNormal[strip_author];
                    pdf_authors[strip_author] = normal_author;
                }
            }
            return {pdf_books, pdf_descriptions, pdf_authors};
        }

        static addPdf(pdf_data, book_title, under_title, last_first_underscores, pdf_country) {
            const {new_link, new_info} = pdf_data;
            var neo4j_promise = build_repository.insertAPdf(new_info, new_link, book_title, under_title, last_first_underscores, pdf_country)
            return neo4j_promise;
        }

        static addPdfs(pdf_books) {
            var my_promises = [];
            for (let title_with_authors in pdf_books) {
                let {book_title, under_title, last_first_underscores, pdf_data_1, pdf_data_2, pdf_data_3, pdf_data_4, pdf_country}  = pdf_books[title_with_authors];
                const pdf_promise_1 = PdfBuild.addPdf(pdf_data_1, book_title, under_title, last_first_underscores, pdf_country);
                my_promises.push(pdf_promise_1);
                if (pdf_data_2 !== '') {
                    const pdf_promise_2 = PdfBuild.addPdf(pdf_data_2, book_title, under_title, last_first_underscores, pdf_country);
                    my_promises.push(pdf_promise_2);
                }
                if (pdf_data_3 !== '') {
                    const pdf_promise_3 = PdfBuild.addPdf(pdf_data_3, book_title, under_title, last_first_underscores, pdf_country);
                    my_promises.push(pdf_promise_3);
                }
                if (pdf_data_4 !== '') {
                    const pdf_promise_4 = PdfBuild.addPdf(pdf_data_4, book_title, under_title, last_first_underscores, pdf_country);
                    my_promises.push(pdf_promise_4);
                }
            }
            return Promise.all(my_promises)
        }

        static findPdfBooks(pdf_csv) {
            let pdf_books = {};
            for (let pdf_object of pdf_csv) {
                let {title_with_authors, book_title, under_title, esc_book_title, last_first_underscores, pdf_data_1, pdf_data_2, pdf_data_3, pdf_data_4, pdf_country}=pdf_object;
                pdf_books[title_with_authors] = {
                    book_title, under_title, esc_book_title, last_first_underscores,
                    pdf_data_1, pdf_data_2, pdf_data_3, pdf_data_4, pdf_country
                };
            }
            return pdf_books;
        }

    }

    return PdfBuild;

}


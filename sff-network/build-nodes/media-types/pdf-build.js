
var media_constants = rootAppRequire('sff-network/media-constants')

MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')

module.exports = function (build_repository) {



    class PdfBuild extends MediaBuild {


        
        static pdfLinkInfo(pdf_link, pdf_pages, pdf_country, pdf_info) {
            if (pdf_link === '') {
                return '';
            }
            let new_info;
            const new_link = media_constants.MEDIA_LINK_DIR + pdf_link;
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


                let {full_1_author, full_2_author, strip_1_author, strip_2_author}=MediaBuild.split2Authors(pdf_object['book author']);

             
                var story_wiki = pdf_object['story link on wikipedia'];
                var author_wiki = pdf_object['author wikipedia entry'];
                var book_title = pdf_object['book title'];
                var pdf_country = pdf_object['pdf country 1'];
                var pdf_data_1 = PdfBuild.pdfLinkInfo(pdf_object['pdf link 1'], pdf_object['pdf page count 1'], pdf_object['pdf country 1'], pdf_object['pdf info 1']);
                var pdf_data_2 = PdfBuild.pdfLinkInfo(pdf_object['pdf link 2'], pdf_object['pdf page count 2'], pdf_object['pdf country 2'], pdf_object['pdf info 2']);
                var pdf_data_3 = PdfBuild.pdfLinkInfo(pdf_object['pdf link 3'], pdf_object['pdf page count 3'], pdf_object['pdf country 3'], pdf_object['pdf info 3']);
                var pdf_data_4 = PdfBuild.pdfLinkInfo(pdf_object['pdf link 4'], pdf_object['pdf page count 4'], pdf_object['pdf country 4'], pdf_object['pdf info 4']);

let {esc_book_title, under_title, title_auth1_auth2}=MediaBuild.bookAuthor1Author2(pdf_object['book title'], strip_1_author, strip_2_author)

                var small_pdf = {
                    title_auth1_auth2,
                    full_1_author,
                    strip_1_author,
                    full_2_author,
                    strip_2_author,
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
                pdf_books[title_auth1_auth2] = {esc_book_title, under_title, strip_1_author, strip_2_author};
                pdf_descriptions.push(small_pdf);
                pdf_authors[strip_1_author] = full_1_author;
            }
            return {pdf_books, pdf_descriptions, pdf_authors};
        }


        static addPdf(pdf_data, book_title, under_title, strip_1_author, strip_2_author,pdf_country) {
            const {new_link, new_info} = pdf_data;
            var neo4j_promise = build_repository.insertAPdf(new_info, new_link, book_title, under_title, strip_1_author, strip_2_author,pdf_country)
            return neo4j_promise;
        }


        static addPdfs(pdf_books) {
            var my_promises = [];
            for (let title_auth1_auth2 in pdf_books) {
                let {book_title, under_title, strip_1_author, strip_2_author, pdf_data_1, pdf_data_2, pdf_data_3, pdf_data_4,pdf_country}  = pdf_books[title_auth1_auth2];


                const pdf_promise_1 = PdfBuild.addPdf(pdf_data_1, book_title, under_title, strip_1_author, strip_2_author,pdf_country);
                my_promises.push(pdf_promise_1);
                if (pdf_data_2 !== '') {
                   const pdf_promise_2 = PdfBuild.addPdf(pdf_data_2, book_title, under_title, strip_1_author, strip_2_author,pdf_country);
                    my_promises.push(pdf_promise_2);
                }
                if (pdf_data_3 !== '') {
                    const pdf_promise_3 = PdfBuild.addPdf(pdf_data_3, book_title, under_title, strip_1_author, strip_2_author,pdf_country);
                    my_promises.push(pdf_promise_3);
                }
                if (pdf_data_4 !== '') {
                    const pdf_promise_4 = PdfBuild.addPdf(pdf_data_4, book_title, under_title, strip_1_author, strip_2_author,pdf_country);
                    my_promises.push(pdf_promise_4);
                }
            }
              return Promise.all(my_promises)
        //    return my_promises;

        }

        static findPdfBooks(pdf_csv) {
            let pdf_books = {};
            for (let pdf_object of pdf_csv) {
                let {title_auth1_auth2, book_title,  under_title, esc_book_title, strip_1_author, strip_2_author, pdf_data_1, pdf_data_2, pdf_data_3, pdf_data_4, pdf_country}=pdf_object;
                pdf_books[title_auth1_auth2] = {
                    book_title, under_title, esc_book_title, strip_1_author, strip_2_author,
                    pdf_data_1, pdf_data_2, pdf_data_3, pdf_data_4, pdf_country
                };
            }
            return pdf_books;
        }


////////////////


    }

    return PdfBuild;

}


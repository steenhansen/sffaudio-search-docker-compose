MediaBuild = rootAppRequire('common-node/build-nodes/media-types/media-build')

var graph_constants = rootAppRequire('common-node/graph-constants')

MultipleMonikers = rootAppRequire('common-node/multiple-monikers');

var multiple_monikers = new MultipleMonikers();

module.exports = function (build_repository) {


    class RsdBuild extends MediaBuild {


        static insertRsdsOfBook() {
            var neo4j_promise = build_repository.insertRsdsOfBook()
            return neo4j_promise;
        }

        static  rsdRead(rsd_csv) {
            let rsd_descriptions = [];
            let rsd_books = {};
            let rsd_authors = {};
            for (let rsd_object of rsd_csv) {
                let rsd_pdf_link = rsd_object['pdf link'];          /// rsd_pdf !!!
                var rsd_number = rsd_object['episode number'];
                var rsd_post = rsd_object['post link'];
                var rsd_description = rsd_object['podcast description'];
                multiple_monikers.parseNames(rsd_object['book author'])
                var last_first_underscores = multiple_monikers.lastUnderscore();
                var {esc_book_title, under_title} =MediaBuild.quoteUnderscoreTitle(rsd_object['book title'])
                var title_with_authors = multiple_monikers.titleWithAuthors(under_title);
                rsd_books[title_with_authors] = {esc_book_title, under_title, last_first_underscores};
                var underScoreToNormal = multiple_monikers.underScoreToNormal();
                for (var strip_author in underScoreToNormal) {
                    var normal_author = underScoreToNormal[strip_author];
                    rsd_authors[strip_author] = normal_author;
                }
                var rsd_link = graph_constants.MEDIA_LINK_DIR + rsd_object['file name']
                var video_link = rsd_object['video link'];
                var small_rsd = {
                    rsd_number,
                    rsd_post,
                    rsd_description,
                    under_title,
                    rsd_link,
                    rsd_pdf_link,
                    video_link,
                    last_first_underscores
                };
                rsd_descriptions.push(small_rsd);
            }
            return {rsd_books, rsd_descriptions, rsd_authors};
        }

        static findRsdBooks(rsd_csv) {
            let rsd_books = {};
            for (let rsd_object of rsd_csv) {
                let {rsd_number, rsd_post, rsd_description, under_title, rsd_link, rsd_pdf_link, video_link, last_first_underscores}=rsd_object;
                rsd_books[under_title] = {
                    rsd_number,
                    rsd_post,
                    rsd_description,
                    under_title,
                    rsd_link,
                    rsd_pdf_link,
                    video_link,
                    last_first_underscores
                };
            }
            return rsd_books;
        }

        static addRsds(rsd_books) {
            var my_promises = [];
            for (let under_title in rsd_books) {
                let {rsd_number, rsd_post, rsd_description, rsd_link, rsd_pdf_link, video_link, last_first_underscores}  = rsd_books[under_title];
                var rsd_title = 'RSD # ' + rsd_number;
                const rsd_promise = build_repository.insertAnRsd(rsd_title, under_title, rsd_description, rsd_link, rsd_pdf_link, video_link, last_first_underscores);
                my_promises.push(rsd_promise);
            }
            return Promise.all(my_promises)
        }

    }


    return RsdBuild;

}

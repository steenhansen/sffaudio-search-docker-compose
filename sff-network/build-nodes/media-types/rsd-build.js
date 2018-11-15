MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')

var media_constants = rootAppRequire('sff-network/media-constants')


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
                let {full_1_author, full_2_author, strip_1_author, strip_2_author}=MediaBuild.split2Authors(rsd_object['book author']);
                var rsd_number = rsd_object['episode number'];
                var rsd_post = rsd_object['post link'];
                var rsd_description = rsd_object['podcast description'];

                let {esc_book_title, under_title, title_auth1_auth2}=MediaBuild.bookAuthor1Author2(rsd_object['book title'], strip_1_author, strip_2_author)
                rsd_books[title_auth1_auth2] = {esc_book_title, under_title, strip_1_author, strip_2_author};
                rsd_authors[strip_1_author] = full_1_author;
                rsd_authors[strip_2_author] = full_2_author;

                var rsd_link = media_constants.MEDIA_LINK_DIR + rsd_object['file name']
                var video_link = rsd_object['video link'];
                var strip_author = strip_1_author;
              
                
                var small_rsd = {rsd_number, rsd_post, rsd_description, under_title, rsd_link, rsd_pdf_link,video_link,strip_author};
                rsd_descriptions.push(small_rsd);
            }
            return {rsd_books, rsd_descriptions, rsd_authors};
        }


        static findRsdBooks(rsd_csv) {
            let rsd_books = {};
            for (let rsd_object of rsd_csv) {
                let {rsd_number, rsd_post, rsd_description, under_title, rsd_link, rsd_pdf_link,video_link,strip_author}=rsd_object;
                rsd_books[under_title] = {rsd_number, rsd_post, rsd_description, under_title, rsd_link, rsd_pdf_link,video_link,strip_author};
            }
            return rsd_books;
        }


        static addRsds(rsd_books) {
            var my_promises = [];
            for (let under_title in rsd_books) {
                let {rsd_number, rsd_post, rsd_description, rsd_link, rsd_pdf_link,video_link, strip_author}  = rsd_books[under_title];
                
                
                var rsd_title = 'RSD # ' + rsd_number;

                const rsd_promise = build_repository.insertAnRsd(rsd_title, under_title, rsd_description, rsd_link, rsd_pdf_link,video_link, strip_author);


                my_promises.push(rsd_promise);
            }
             return Promise.all(my_promises)
           // return my_promises;
        }

        static addRsdsPage() {
            return build_repository.insertRsdPage();
        }

    }


    return RsdBuild;

}

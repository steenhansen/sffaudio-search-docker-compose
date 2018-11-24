MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')

var media_constants = rootAppRequire('sff-network/media-constants')


module.exports = function (build_repository) {

    class BookBuild extends MediaBuild {


        static findStoryWiki(pdf_csv) {            // findBookWiki
            let story_wikis = {};


            for (let pdf_object of pdf_csv) {
                let {under_title, full_title, last_first_underscores, story_wiki}=pdf_object;
                if (story_wiki) {
                    story_wikis[under_title] = story_wiki;
                }
            }
            return story_wikis;
        }


        static addABook(sorted_label, esc_book_title, under_title, last_first_underscores) {
         ///  console.log('jjjjjjjj', sorted_label, esc_book_title, under_title, last_first_underscores)
            return build_repository.insertABook(sorted_label, esc_book_title, under_title, last_first_underscores)
        }

        static addBooksNew(book_list) {
            var my_promises = [];
            for (let title_with_authors in book_list) {


                let {sorted_label, esc_book_title, under_title, last_first_underscores}  = book_list[title_with_authors];


                const book_promise = BookBuild.addABook(sorted_label, esc_book_title, under_title, last_first_underscores)
                my_promises.push(book_promise);
            }
            return my_promises;
        }


        static  addStoryWiki(story_wikis) {
            var my_promises = [];
            for (let under_title in story_wikis) {
                const story_wiki = story_wikis[under_title]
                if (story_wiki !== '') {
                    const book_promise = build_repository.insertAWikiBook(story_wiki, under_title);
                    my_promises.push(book_promise);
                }
            }
            return my_promises;
        }


static addPdfsOfBook() {
            return build_repository.insertPdfsOfBook();
        }

        
       static addPdfsPage() {
            return build_repository.insertPdfPage();
        }

        static addWikiStories() {
            return build_repository.insertWikiStories();
        }

    }
    return BookBuild;
}





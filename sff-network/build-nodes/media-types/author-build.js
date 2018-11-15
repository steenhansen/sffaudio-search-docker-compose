MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')
var media_constants = rootAppRequire('sff-network/media-constants')
var misc_helper = rootAppRequire('sff-network/misc-helper');
module.exports = function (build_repository) {

//  MATCH (n_author:L_AUTHOR) return *

    class AuthorBuild extends MediaBuild {


        constructor(added_authors = []) {
            super();
            this.processed_authors = added_authors;

        }


        addedAuthors() {
            return this.processed_authors;

        }

        //   CLASS AuthorDb --- ????
        addAuthors(book_authors) {
            var my_promises = [];
            for (let strip_author in book_authors) {
                if (!this.processed_authors.includes(strip_author)) {
                    this.processed_authors.push(strip_author);
                    const full_author = book_authors[strip_author];
                    const sorted_label = misc_helper.theLastNameFirst(full_author, ' ');
                    var neo4j_promise = build_repository.insertAuthor(full_author, strip_author, sorted_label);
                    my_promises.push(neo4j_promise);
                }
            }
            return my_promises;
        }



        findAuthorWiki(pdf_csv) {
            let author_wikis = {};
            for (let pdf_object of pdf_csv) {
                let {title_auth1_auth2, under_title, full_title, strip_1_author, strip_2_author, author_wiki}=pdf_object;
                strip_1_author = strip_1_author;
                author_wikis[strip_1_author] = author_wiki;
            }
            return author_wikis;
        }

        addAuthorWiki(author_wikis) {
            var my_promises = [];
            for (let strip_author in author_wikis) {
                const author_wiki = author_wikis[strip_author]
                if (author_wiki !== '') {
                    var neo4j_promise = build_repository.insertAWikiAuthor(author_wiki, strip_author);
                    my_promises.push(neo4j_promise);

                }
            }
            return my_promises;
        }


        addWrittenBy() {
            var author_1 = build_repository.insertWrittenBy_author_1();
            var author_2 = build_repository.insertWrittenBy_author_2();
            return Promise.all([author_1, author_2]).then(
                ()=> {
                    //console.log('done saveWrittenBy_d_1')
                }
            )
   

        }

        addWikiAuthors() {

            var neo4j_promise = build_repository.insertWikiAuthors()
            return neo4j_promise;
        }


    }
    return AuthorBuild;

}




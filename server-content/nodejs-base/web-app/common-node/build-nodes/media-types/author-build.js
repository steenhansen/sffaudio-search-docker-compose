MediaBuild = rootAppRequire('common-node/build-nodes/media-types/media-build')
var graph_constants = rootAppRequire('common-node/graph-constants')
var misc_helper = rootAppRequire('common-node/misc-helper');
AuthorMoniker = rootAppRequire('common-node/author-moniker');
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
            var author_moniker = new AuthorMoniker();
            for (let strip_author in book_authors) {
                if (!this.processed_authors.includes(strip_author)) {
                    this.processed_authors.push(strip_author);
                    const full_author = book_authors[strip_author];
                    author_moniker.reloadName(full_author);
                    const sorted_label = author_moniker.lastFirstMiddle();
                    var neo4j_promise = build_repository.insertAuthor(full_author, strip_author, sorted_label);
                    my_promises.push(neo4j_promise);
                }
            }
            return my_promises;
        }

        findAuthorWiki(pdf_csv) {
            let author_wikis = {};
            for (let pdf_object of pdf_csv) {
                let {last_first_underscores, author_wiki}=pdf_object;
                var strip_author = last_first_underscores[0];
                author_wikis[strip_author] = author_wiki;
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

        addWikiAuthors() {
            var neo4j_promise = build_repository.insertWikiAuthors()
            return neo4j_promise;
        }

    }
    return AuthorBuild;

}




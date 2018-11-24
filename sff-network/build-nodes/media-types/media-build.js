var media_constants = rootAppRequire('sff-network/media-constants')
var misc_helper = rootAppRequire('sff-network/misc-helper')
const author_delimiter = media_constants.BOOK_AUTHOR_DELIMITER;
AuthorMoniker = rootAppRequire('sff-network/author-moniker');


class MediaBuild {

    
    static authorNames(full_bracket_name) {
        var author_moniker = new AuthorMoniker(full_bracket_name);
        var strip_author = author_moniker.fmlUnderscoreLower();
        var full_author = author_moniker.fmlSpaces();
        return [full_author, strip_author];
    }




    static quoteUnderscoreTitle(book_title) {  // move to author_build
       //console.log( 'book_title', book_title)
        var esc_book_title = MediaBuild.escapeQuote(book_title);
      // console.log( 'esc_book_title', esc_book_title)
        var under_title = misc_helper.alphaUnderscore(esc_book_title);
     //  console.log( 'under_title', under_title)
        return {esc_book_title, under_title};
    }


    static escapeQuote(csv_string) {   // move to author_build
        var escaped_quote = csv_string.replace(/’|\'/gi, "\'");  // somewhere else
        return escaped_quote;
    }

    constructor(id, node_label, sorted_label) {
        this.id = id;
        this.label = node_label;
        this.sorted_label = sorted_label;


    }

    

    static sortedLabel(the_name, space_char) {
        if (space_char === '_') {
            var start_articles_reg_ex = /^(a_|an_|the_)/i;
        } else {
            var start_articles_reg_ex = /^(a |an |the )/i;
        }
        var book_articles = the_name.split(start_articles_reg_ex);
        if (book_articles.length > 1) {
            var sorted_label = book_articles[2];
        } else {
            var sorted_label = book_articles[0];
        }
        return sorted_label;
    }


}

module.exports = MediaBuild;

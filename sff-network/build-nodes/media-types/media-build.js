var media_constants = rootAppRequire('sff-network/media-constants')
var misc_helper = rootAppRequire('sff-network/misc-helper')
const author_delimiter = media_constants.BOOK_AUTHOR_DELIMITER;
class MediaBuild {

        static  bookAuthor1Author2(book_title_with_spaces, strip_1_author, strip_2_author){
      let {esc_book_title, under_title} =MediaBuild.quoteUnderscoreTitle(book_title_with_spaces)
                var title_auth1_auth2 = MediaBuild.stripTitleAuthor(under_title, strip_1_author, strip_2_author);
        return {esc_book_title, under_title, title_auth1_auth2}
    }

    static authorNames(full_bracket_name){
        var bracket_array = full_bracket_name.split('(');
        var bracket_author = bracket_array[0];
        
        var translate_array = bracket_author.split('translated');
        var full_author = translate_array[0];
        
        
        var strip_author = misc_helper.alphaUnderscore(full_author); 
        return [full_author, strip_author];
    }


    static split2Authors(possible_2_authors) {
        const authors_with_array = possible_2_authors.split(media_constants.WITH_REGEX);
        if (authors_with_array.length > 1) {
            var full_1_bracket = authors_with_array[0];
            var full_2_bracket = authors_with_array[1];
        } else {
            var full_1_bracket = possible_2_authors;
            var full_2_bracket = '';
        }
        let [full_1_author, strip_1_author] = MediaBuild.authorNames(full_1_bracket);
        let [full_2_author, strip_2_author] = MediaBuild.authorNames(full_2_bracket);
        
        return {full_1_author, full_2_author, strip_1_author, strip_2_author}
    }
    
    static quoteUnderscoreTitle(book_title) {  // move to author_build
        var esc_book_title = MediaBuild.escapeQuote(book_title);
        var under_title = misc_helper.alphaUnderscore(esc_book_title); 
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

    static stripTitleAuthor(under_title, strip_author_1, strip_author_2) {
        var delim_author_1 = author_delimiter + strip_author_1 + author_delimiter;
        if (strip_author_2 === '') {
            var delim_author_2 = ''
        } else {
            var delim_author_2 = strip_author_2 + author_delimiter;
        }
        var title_auth1_auth2 = under_title + delim_author_1 + delim_author_2;
        var underscore_title_author = misc_helper.spacesToUnderscore(title_auth1_auth2);
        return underscore_title_author;
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

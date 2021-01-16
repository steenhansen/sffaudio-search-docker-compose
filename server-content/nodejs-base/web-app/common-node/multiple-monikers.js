AuthorMoniker = rootAppRequire('common-node/author-moniker');
MediaBuild = rootAppRequire('common-node/build-nodes/media-types/media-build')

var graph_constants = rootAppRequire('common-node/graph-constants');
const {BOOK_AUTHOR_DELIMITER}=graph_constants;

class MultipleMonikers {

    constructor(comma_names) {
        if (typeof comma_names !== 'undefined') {
            parseNames(comma_names);
        }
        this.multiple_names = [];
        this.multiple_fixed = [];
        this.firstMiddleLastArray = []
    }

    parseNames(comma_names) {
        this.last_name_first_spaces = [];
        this.last_name_first_underscore = [];
        this.first_middle_last = [];
        this.underscore_to_normal = {};
        this.findMultiples(comma_names);
        this.fixJuniorMd();
        this.multipleMiddles();
        return this.firstMiddleLastArray;
    }

    replaceNoSpaceInitial(match, initial_dot_inital_dot, no_space_last_name, offset, string) {
        return initial_dot_inital_dot + ' ' + no_space_last_name;
    }

    fixJuniorMd() {
        this.multiple_fixed = []
        for (var a_name of  this.multiple_names) {
            var trim_name = a_name.trim();
            if (trim_name !== '') {
                trim_name = trim_name.replace("~ Jr.", ", Jr.");
                trim_name = trim_name.replace("~ M.D.", ", M.D.");
                var no_spaces_after_initial = /([A-Za-z])\.([A-Za-z]{2,})/;     // H.P.Lovecraft matches 'P.Lovecraft'
                if (trim_name.match(no_spaces_after_initial)) {
                    var alpha_dot_alpha = /(.*[A-Za-z]\.)([A-Za-z]{2,})/;         // (H.P.) (Lovecraft)
                    var trim_name = trim_name.replace(alpha_dot_alpha, this.replaceNoSpaceInitial);
                }
                this.multiple_fixed.push(trim_name);
            }
        }
    }

    blankExtras(string_with_extras) {
        var shrink_string = string_with_extras.replace(", editor", " ");
        var shrink_string = shrink_string.replace("ascribed to ", " ");
        var shrink_string = shrink_string.replace("edited by ", " ");
        shrink_string = shrink_string.replace(", translated ", " ");
        return shrink_string;
    }

    findMultiples(comma_names) {
        var multiples_work = this.blankExtras(comma_names);
        var multiples_work = multiples_work.replace(/, Jr\./gi, "~ Jr.");
        var multiples_work = multiples_work.replace(/, M\.D\./gi, "~ M.D.");
        var multiples_work = multiples_work.replace(/, and /gi, ", ");
        var multiples_work = multiples_work.replace(/ and /gi, ", ");
        var two_commas = /,\s*,/;
        var multiples_work = multiples_work.replace(two_commas, ',');


        this.multiple_names = multiples_work.split(',');
    }


    multipleMiddles() {
        var author_moniker = new AuthorMoniker();
        this.multiple_f_m_l = [];
        for (var a_name of this.multiple_fixed) {
            author_moniker.reloadName(a_name);
            var last_name_first = author_moniker.lastNameFirst();
            var first_middle_last = author_moniker.fmlSpaces();
            var last_underscore = author_moniker.fmlUnderscoreLower();
            this.last_name_first_spaces.push(last_name_first);
            this.last_name_first_underscore.push(last_underscore);
            this.first_middle_last.push(first_middle_last);
            this.underscore_to_normal[last_underscore] = first_middle_last;


            var firstMiddleLastArray = author_moniker.firstMiddleLastArray();
            this.firstMiddleLastArray.push(firstMiddleLastArray);

        }
    }

    titleWithAuthors(under_title) {
        var title_with_authors = under_title + BOOK_AUTHOR_DELIMITER + this.last_name_first_underscore.join(BOOK_AUTHOR_DELIMITER);
        return title_with_authors
    }

    lastUnderscore() {
        return this.last_name_first_underscore
    }

    firstMiddleLast() {
        return this.first_middle_last
    }

    underScoreToNormal() {
        return this.underscore_to_normal;
    }

}

module.exports = MultipleMonikers;



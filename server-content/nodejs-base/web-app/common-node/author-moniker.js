var graph_constants = rootAppRequire('common-node/graph-constants');
const {URL_SEPARATOR, BOOK_AUTHOR_DELIMITER}=graph_constants;


const FRENCH_LAST_NAMES = {
    ' de ': ' de' + BOOK_AUTHOR_DELIMITER,
    ' le ': ' le' + BOOK_AUTHOR_DELIMITER,
    ' van ': ' Van' + BOOK_AUTHOR_DELIMITER
};


class AuthorMoniker {

    constructor(full_name) {
        if (typeof full_name !== 'undefined') {
            this.reloadName(full_name);
        }
    }

    reloadName(full_name) {
        this.full_name = full_name.trim();
        this.partial_name = this.full_name;
        this.ignoreLeadingQuote();
        this.ignoreAka();
        this.ignoreBracket();
        this.ignoreTranslate();

        this.first_the = '';
        this.first_name = '';
        this.middle_names = [];
        this.middle_junior = '';
        this.middle_md = '';
        this.last_name = '';

        this.replaceFrenchLastNames();

        this.findThe();
        this.findJunior();
        this.findMd();
        this.firstMiddleLast();

        this.fixFrenchLastNames();
        this.makeMiddle();
        this.spaces_middle = this.middle_names.join(' ');
        this.underscore_middle = this.middle_names.join(URL_SEPARATOR);
    }


    fixFrenchLastNames() {
        this.last_name = this.last_name.replace(BOOK_AUTHOR_DELIMITER, ' ');
    }


    replaceFrenchLastNames() {
        for (let french_spaced_name in FRENCH_LAST_NAMES) {
            var reg_french = new RegExp(french_spaced_name, 'i');
            var spaced_list = this.partial_name.split(reg_french);
            if (spaced_list.length > 1) {
                this.partial_name = spaced_list[0] + FRENCH_LAST_NAMES[french_spaced_name] + spaced_list[1];
            }

        }

    }


    makeMiddle() {
        if (this.middle_junior) {
            this.middle_names.push(this.middle_junior);
        }
        if (this.middle_md) {
            this.middle_names.push(this.middle_md);
        }

    }

    firstMiddleLastArray() {
        var fml_array = [this.first_name, this.spaces_middle, this.last_name];
        return fml_array;

    }

    lastFirstMiddle() {
        var last_first_middle = this.last_name + ' ' + this.first_name + ' ' + this.spaces_middle;
        return last_first_middle;
    }

    lastNameFirst() {
        var last_name_first = this.last_name + ' ' + this.spaces_middle + ' ' + this.first_name;
        return last_name_first;
    }

    fmlSpaces() {
        var first_middle_last = this.first_name + ' ' + this.spaces_middle + ' ' + this.last_name;
        first_middle_last = first_middle_last.replace(/\s\s+/g, ' ');
        return first_middle_last;
    }

    fmlUnderscoreLower() {
        if (this.last_name == '') {
            return '';
        }
        if (this.underscore_middle == '') {
            if (this.first_name == '') {
                var fml_underscore = this.last_name;
            } else {
                var fml_underscore = this.first_name + URL_SEPARATOR + this.last_name;
            }
        } else {
            var fml_underscore = this.first_name + URL_SEPARATOR + this.underscore_middle + URL_SEPARATOR + this.last_name;
        }
        fml_underscore = fml_underscore.toLowerCase();
        var reg_exp_str = '[^0-9 a-z' + '\\\\' + URL_SEPARATOR + ']';   // - or _
        var re = new RegExp(reg_exp_str, 'gi');
        var fml_separatored = fml_underscore.replace(re, '');
        return fml_separatored;
    }


    ignoreLeadingQuote() {
        if (this.partial_name.indexOf("'") === 0) {
            this.partial_name = this.partial_name.substring(1);
        }
    }


    ignoreAka() {
        var aka_array = this.partial_name.split(' aka ');
        this.partial_name = aka_array[0];
    }

    ignoreBracket() {
        var bracket_array = this.partial_name.split('(');
        this.partial_name = bracket_array[0];
    }

    ignoreTranslate() {
        var bracket_array = this.partial_name.split('translated');  //       delete this
        this.partial_name = bracket_array[0];
    }

    findThe() {
        if (this.full_name.indexOf('The ') === 0) {
            this.first_the = 'The'
            this.partial_name = this.partial_name.replace('The ', '');
        }
    }


    findJunior() {
        if (this.full_name.indexOf(', Jr.') >= 0) {
            this.middle_junior = 'Jr.'
            this.partial_name = this.partial_name.replace(/, Jr\./gi, '');
            // this.partial_name = this.partial_name.replace(', Jr.', ' ');
        } else if (this.full_name.indexOf(' Jr.') >= 0) {
            this.middle_junior = 'Jr.'
            this.partial_name = this.partial_name.replace(/ Jr\./gi, '');
            //  this.partial_name = this.partial_name.replace(' Jr.', ' ');
        }
    }

    findMd() {
        if (this.full_name.indexOf(', M.D.') >= 0) {
            this.middle_md = 'M.D.'
            this.partial_name = this.partial_name.replace(/, M\.D\./gi, '');

//            this.partial_name = this.partial_name.replace(', M.D.', ' ');
        } else if (this.full_name.indexOf(' M.D.') >= 0) {
            this.middle_md = 'M.D.'
            this.partial_name = this.partial_name.replace(/ M\.D\./gi, '');
            // this.partial_name = this.partial_name.replace(' M.D.', ' ');
        }
    }

    firstMiddleLast() {
        var partial_name = this.partial_name.trim();
        var spaces_names = partial_name.split(' ');
        this.last_name = spaces_names.pop();
        if (spaces_names.length > 0) {
            this.first_name = this.first_the + ' ' + spaces_names.shift();
            this.first_name = this.first_name.trim();
            if (spaces_names.length > 0) {
                this.middle_names = spaces_names;
            }
        }

    }


}

module.exports = AuthorMoniker;



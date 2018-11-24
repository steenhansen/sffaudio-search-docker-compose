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


        this.find_DeCamp();
        this.find_LeGuin();
this.find_deMaupassant();

        this.findThe();
        this.findJunior();
        this.findMd();
        this.firstMiddleLast();
        
        this.fix_DeCamp();
        this.fix_LeGuin();
 this.fix_deMaupassant();
 
        this.makeMiddle();
        this.spaces_middle = this.middle_names.join(' ');
        this.underscore_middle = this.middle_names.join('_');
        // console.log('***************************************')
        // console.log(full_name)
        // console.log('f===', this.first_name)
        // console.log('m===', this.spaces_middle)
        // console.log('l===', this.last_name)
        // console.log('#######################################')


    }

    fix_LeGuin() {
        if (this.last_name.indexOf("Le^Guin") >= 0) {
            this.last_name= this.last_name.replace("Le^Guin", "Le Guin");
        }
    }

    fix_DeCamp() {
        if (this.last_name.indexOf("de^Camp") >= 0) {
            this.last_name= this.last_name.replace("de^Camp", "de Camp");
        }
    }

 fix_deMaupassant() {
        if (this.last_name.indexOf("de^Maupassant") >= 0) {
            this.last_name= this.last_name.replace("de^Maupassant", "de Maupassant");
        }
    }
//de Maupassant

find_deMaupassant() {
        var re = /DE MAUPASSANT/i;
        var de_maupassant_list = this.partial_name.split(re);
        if (de_maupassant_list.length > 1) {
            this.partial_name = de_maupassant_list[0] + "de^Maupassant";
        }
    }

    find_LeGuin() {
        var re = /LE GUIN/i;
        var le_guin_list = this.partial_name.split(re);
        if (le_guin_list.length > 1) {
            this.partial_name = le_guin_list[0] + "Le^Guin";
        }
    }

    find_DeCamp() {
        var re = /DE CAMP/i;
        var de_camp_list = this.partial_name.split(re);
        if (de_camp_list.length > 1) {
            this.partial_name = de_camp_list[0] + "de^Camp";
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
        //console.log('first_middle_last==', first_middle_last)  
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
                var fml_underscore = this.first_name + '_' + this.last_name;
            }
        } else {
            var fml_underscore = this.first_name + '_' + this.underscore_middle + '_' + this.last_name;
        }
        fml_underscore = fml_underscore.toLowerCase();
        fml_underscore = fml_underscore.replace(/[^0-9a-z _]/gi, '');
        return fml_underscore;
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
            this.partial_name = this.partial_name.replace(', Jr.', ' ');
        } else if (this.full_name.indexOf(' Jr.') >= 0) {
            this.middle_junior = 'Jr.'
            this.partial_name = this.partial_name.replace(' Jr.', ' ');
        }
    }

    findMd() {
        if (this.full_name.indexOf(', M.D.') >= 0) {
            this.middle_md = 'M.D.'
            this.partial_name = this.partial_name.replace(', M.D.', ' ');
        } else if (this.full_name.indexOf(' M.D.') >= 0) {
            this.middle_md = 'M.D.'
            this.partial_name = this.partial_name.replace(' M.D.', ' ');
        }
    }

    firstMiddleLast() {
//console.log('this.partial_name == ', '==' + this.partial_name + '__')
        var partial_name = this.partial_name.trim();
//console.log('this.partial_name == ', '==' + partial_name + '__')

        var spaces_names = partial_name.split(' ');
console.log('fiurstMidlleList', spaces_names)
        this.last_name = spaces_names.pop();
        if (spaces_names.length > 0) {
            this.first_name = this.first_the + ' ' + spaces_names.shift();
            this.first_name = this.first_name.trim();
            if (spaces_names.length > 0) {
                this.middle_names = spaces_names;
                //  var middle_name = spaces_names.shift();
                // this.middle_names.push(middle_name);
            }
        }

    }


}

module.exports = AuthorMoniker;



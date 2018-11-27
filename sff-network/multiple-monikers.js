AuthorMoniker = rootAppRequire('sff-network/author-moniker');
MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')

class MultipleMonikers {

    constructor(comma_names) {
        if (typeof comma_names !== 'undefined') {
            parseNames(comma_names);
        }
        this.multiple_names = [];
        this.multiple_fixed = [];

    }

    parseNames(comma_names) {
            this.last_name_first_spaces = [];
        this.last_name_first_underscore = [];
        this.first_middle_last = [];
        this.underscore_to_normal ={};
        this.findMultiples(comma_names);
        this.fixJuniorMd();
        this.multipleMiddles();
        // console.log('***************************************')
        // console.log(' this.last_name_first_spaces', this.last_name_first_spaces)
        // console.log(' this.last_name_first_underscore', this.last_name_first_underscore)
        //
        // console.log(' this.first_middle_last', this.first_middle_last)
        // console.log('#######################################')
    }

    blankExtras(string_with_extras) {
        //  console.log('string_with_extras===', string_with_extras)
        var shrink_string = string_with_extras.replace(", editor", " ");
        //   console.log('shrink_string===', shrink_string)
        var shrink_string = shrink_string.replace("ascribed to ", " ");
        var shrink_string = shrink_string.replace("edited by ", " ");


        shrink_string = shrink_string.replace(", translated ", " ");
        return shrink_string;
    }

    findMultiples(comma_names) {
        var multiples_work = this.blankExtras(comma_names);
        var multiples_work = multiples_work.replace(", Jr.", "~ Jr.");
        var multiples_work = multiples_work.replace(", M.D.", "~ M.D.");
        var multiples_work = multiples_work.replace(", and ", ", ");
        var multiples_work = multiples_work.replace(" and ", ", ");
        var two_commas = /,\s*,/;
        var multiples_work = multiples_work.replace(two_commas, ',');
        this.multiple_names = multiples_work.split(',');
        // console.log('---------------------------------------')
        // console.log('---------------------------------------')
        // console.log(':::::', comma_names)
        // console.log(this.multiple_names)
        // console.log('+++++++++++++++++++++++++++++++++++++++')
        // console.log('+++++++++++++++++++++++++++++++++++++++')
    }

    fixJuniorMd() {
        this.multiple_fixed = []
        for (var a_name of  this.multiple_names) {
            var trim_name = a_name.trim();
            if (trim_name !== '') {
                trim_name = trim_name.replace("~ Jr.", ", Jr.");
                trim_name = trim_name.replace("~ M.D.", ", M.D.");
                this.multiple_fixed.push(trim_name);
            }
        }
        // console.log('***************************************')
        // console.log('***************************************')
        // console.log(this.multiple_fixed)
        // console.log('#######################################')
        // console.log('#######################################')
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
            this.underscore_to_normal[last_underscore]=first_middle_last;
        }
        //   console.log('***************************************')
        //   console.log('***************************************')
        //  console.log(this.last_name_first_spaces)
        //    console.log(this.last_name_first_underscore)
        //  console.log(this.first_middle_last)
        // console.log('#######################################')
        // console.log('#######################################')
    }

    titleWithAuthors(under_title) {
     
       
      
     
     
       var  title_with_authors = under_title + '^' + this.last_name_first_underscore.join('^');
        return title_with_authors
    }

    lastUnderscore() {
      //  return  this.last_name_first_underscore.join('^');   // q*bert49   
        return this.last_name_first_underscore
    }

    firstMiddleLast() {
        return this.first_middle_last
    }
    
    underScoreToNormal(){
        return this.underscore_to_normal;
    }

}

module.exports = MultipleMonikers;



var request = require('request');




function theLastNameFirst(full_name, split_char) {
    var name_trimmed = full_name.trim();
    var aka_brackets = name_trimmed.split(' (');
    var first_whole_name = aka_brackets[0];
    var spaces_names = first_whole_name.split(split_char);
    var last_name = spaces_names.pop();
    if (spaces_names.length == 0) {
        var first_name = '-';
    } else {
        var first_name = spaces_names.join(split_char);
    }
    var last_first = last_name + split_char + first_name;
    if (last_first.indexOf('Jr.') === 0) {
        // console.log('last_first =========', last_first)
        // console.log('last_name', last_name)
        // console.log('split_char', split_char)
        // console.log('first_name', first_name)
        var jr_array = first_name.split(split_char);
        var jr_last_name_comma = jr_array.pop();
        var jr_first_name = jr_array[0];
        var jr_last_name = jr_last_name_comma.replace(',', '');
        var jr_last_first = jr_last_name + split_char + 'Jr.' + split_char + jr_first_name;
        //   console.log('======q*bert 2===================')
        // console.log('jr_first_name2', jr_first_name)
        // console.log('jr_last_name2', jr_last_name)
        // console.log('jr_last_first2', jr_last_first)
        return jr_last_first;
    }
    return last_first;
}
//   "book author":"H. Nearing, Jr."

function spacesToUnderscore(author_title) {
    var underscore_author_title = author_title.replace(/ /g, '_');
    return underscore_author_title;
}

function stripToLower(csv_string) {
    var lower_csv = csv_string.toLowerCase();
    var lower_stripped = lower_csv.replace(/[^0-9a-z ]/gi, '');
    return lower_stripped.trim();
}

function alphaUnderscore(book_or_author) {
    var lower_striped = stripToLower(book_or_author);
    var lower_underscored = spacesToUnderscore(lower_striped);
    return lower_underscored;
}


function getRedirects(a_node, field_name) {
    return new Promise(function (fulfill, reject) {
        var get_url = a_node[field_name];
        var node_id = a_node.id;
        if (get_url === '') {
            var end_redirect_url = '';
            fulfill({end_redirect_url, node_id, field_name})
        } else {
            request.get({
                url: get_url,
                method: "HEAD",
                headers: {}
            }, function (error, response, body) {
                if (error) {
                    reject(error)
                }
                var end_redirect_url = response.request.uri.href;
                fulfill({end_redirect_url, node_id, field_name})
            })
        }
    })

}


function resolveRedirects(get_url) {
    return new Promise(function (fulfill, reject) {
        request.get({
            url: get_url,            ///protocol relative URL
            method: "HEAD",
            headers: {}
        }, function (error, response, body) {
            if (error) {
                reject(error)
            }
            var end_redirect_url = response.request.uri.href;
            fulfill(end_redirect_url)
        })
    })
}


module.exports = {theLastNameFirst, spacesToUnderscore, stripToLower, alphaUnderscore, getRedirects, resolveRedirects};

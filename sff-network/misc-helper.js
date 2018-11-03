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
    return last_first;
}


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
        request.get({
            url: a_node[field_name],
            method: "HEAD",
            headers: {}
        }, function (error, response, body) {
            if (error) {
                reject(error)
            }
            var node_id = a_node.id
            var end_redirect_url = response.request.uri.href;
            fulfill({end_redirect_url, node_id, field_name})
        })
    })

}

module.exports = {theLastNameFirst, spacesToUnderscore, stripToLower, alphaUnderscore, getRedirects};

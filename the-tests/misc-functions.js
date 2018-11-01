function concatStrArrays(str_array_1, str_array_2) {
    var array_1 = JSON.parse(str_array_1)
    var array_2 = JSON.parse(str_array_2)
    var single_array = array_1.concat(array_2)
    var tabbed_str = JSON.stringify(single_array, null, ' ')
    return tabbed_str
}

function strArraysEqual(str_array_1, str_array_2) {
    var no_tabs_str_1 = str_array_1.replace(/\s/g, "");
    var no_tabs_str_2 = str_array_2.replace(/\s/g, "");
    return no_tabs_str_1 == no_tabs_str_2;
}


function arrayEqual(a1, a2) {
    return a1.length == a2.length && a1.every((v, i)=> v === a2[i])
}

function objectEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/*
       var test_promise = new Promise(function (resolve, reject) {
            setTimeout(resolve, 0, all_csv);
        });
        return test_promise;
*/

function showIfDifferent(is_data, should_be_data, test_location) {
    if (strArraysEqual(is_data, should_be_data)) {
        console.log('.')
        
        var test_promise = new Promise(function (resolve, reject) {
            setTimeout(resolve, 0);
        });
        return test_promise;
        
    } else {
        console.log('ERROR ', test_location)
        console.log('*************************')
        console.log('       is_data = ', is_data)
        console.log('*************************')
        console.log('should_be_data = ', should_be_data)
        console.log('*************************')
        console.log('*************************')
    }
}

module.exports = {concatStrArrays, strArraysEqual, arrayEqual, objectEqual, showIfDifferent};

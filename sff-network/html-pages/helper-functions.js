// helper-functions start


sff_js_vars.helpers = (function () {

    var my = {};

    my._fetch_test_ = {};

    my.timeout_error = 'Request timed out';

    my.dead_database = {
        "nodes_string": '[{"node_type":"L_DB_DOWN", ' +
        '                  "group": "N_DB_DOWN",  ' +
        '                  "title": "Refresh in a minute.",' +
        '                  "label": "Wait a minute, updating database."}]',
        "edges_string": '[]',
        "graph_string": '{"strip_author":"db-timeout","graph_physics":{"barnesHut":{"avoidOverlap":1}}}'
    };


    my.crash_response = {
        json: function () {
            return my.dead_database;
        },
        text: function () {
            return my.timeout_error;     // not used in tests
        }
    };

    my.overlayCoverScreen = function () {
        var screen_height_px = sff_js_vars.blur_procs.overlayHeightPx();
        var header_height = sff_js_vars.helpers.computedValue("sff--header", "height");
        var my_network = document.getElementById("my--network")
        var popup_container = document.getElementById("popup--container")
        popup_container.style.height = screen_height_px;
        popup_container.style.top = my_network.style.top + header_height * 1.7;
        popup_container.style.left = my_network.style.left + 20;
        sff_js_vars.helpers.setDisplay('close--icon', 'block');

    }

    my.computedValue = function (element_id, value_name) {
        var html_element = document.getElementById(element_id);
        var computed_style = window.getComputedStyle(html_element);
        var computed_height = parseInt(computed_style.getPropertyValue(value_name), 10);
        return computed_height;
    }

    my.computedHeight = function (element_id) {
        return my.computedValue(element_id, 'height');
    }


    my.objectIsEmpty = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    my.setDisplay = function (elem_id, display_value) {
        document.getElementById(elem_id).style.display = display_value;
    };

    my.setDisplayNone = function (elem_id) {
        document.getElementById(elem_id).style.display = 'none';
    };

    my.setDisplayBlock = function (elem_id) {
        document.getElementById(elem_id).style.display = 'block';
    };

    my.setHeight = function (elem_id, height_integer) {
        document.getElementById(elem_id).style.height = height_integer + 'px';
    };

    my.detectIE = function () {            // Edge is ok
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return true;
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            return true;
        }
        return false;
    };


    my.setHeight38 = function (elem_id) {
        document.getElementById(elem_id).style.height = '38px';
    };
    my.setHeight16 = function (elem_id) {
        document.getElementById(elem_id).style.height = '16px';
    };

    my.setVisible = function (elem_id) {
        document.getElementById(elem_id).style.visibility = 'visible';
    };

    my.setHidden = function (elem_id) {
        document.getElementById(elem_id).style.visibility = 'hidden';
    };

    my.focusBook = function (id) {
        document.getElementById(id + '_article').style.visibility = 'visible';
        document.getElementById(id + '_rest').style.height = '5.5em';
        document.getElementById(id + '_rest').style.position = 'relative';
        document.getElementById(id + '_rest').style.backgroundColor = 'yellow';
    };

    my.blurBook = function (id) {
        document.getElementById(id + '_article').style.visibility = 'hidden';
        document.getElementById(id + '_rest').style.height = '2em';
        document.getElementById(id + '_rest').style.position = 'static';
        document.getElementById(id + '_rest').style.backgroundColor = 'transparent';
    };


    my.busyCursor = function () {
        var body_elem = document.getElementsByTagName("BODY")[0];
        body_elem.classList.add('busy--cursor');
    };

    my.normalCursor = function () {
        var body_elem = document.getElementsByTagName("BODY")[0];
        body_elem.classList.remove('busy--cursor');
    };

//  in console  sff_js_vars.helpers._testFetch_()
    my._testFetch_ = function () {
        var url_not_exist = window.origin + '/author/not-exist?a';
        var vector_not_exist = {test_time_vector: [1000]};
        my.fetchTimeout(url_not_exist, vector_not_exist)
            .then(function (response_not_exist) {
                if (my._fetch_test_[url_not_exist] !== 1) {
                    console.log('ERROR response_not_exist : ', my._fetch_test_[url_not_exist], ' Not 1')
                }
                return response_not_exist.json();
            })
            .then(function (my_json) {
                var not_exist_nodes = JSON.parse(my_json.nodes_string)
                if (not_exist_nodes.length !== 0) {
                    console.log('ERROR not_exist_nodes.length === ', not_exist_nodes.length, ' Not 0')
                } else {
                    console.log('passed - url_not_exist');
                }
            })

        var url_exist = window.origin + '/author/philip-k-dick?b';
        var vector_exist = {test_time_vector: [1000]};
        my.fetchTimeout(url_exist, vector_exist)
            .then(function (response_exist) {
                if (my._fetch_test_[url_exist] !== 1) {
                    console.log('ERROR response_exist : ', my._fetch_test_[url_exist], ' Not 1')
                }
                return response_exist.json();
            })
            .then(function (my_json) {
                var exist_nodes = JSON.parse(my_json.nodes_string)
                if (exist_nodes[0].strip_author !== 'philip-k-dick') {
                    console.log('ERROR exist_nodes[0].strip_author === ', exist_nodes[0].strip_author, 'Not philip-k-dick')
                } else {
                    console.log('passed - url_exist');
                }
            })

        var url_fail_4 = window.origin + '/author/philip-k-dick?c';
        var vector_fail_4 = {test_time_vector: [1, 1, 1, 1]};
        my.fetchTimeout(url_fail_4, vector_fail_4)
            .then(function (response_fail_4) {
                if (my._fetch_test_[url_fail_4] !== 5) {
                    console.log('ERROR response_fail_4 : ', my._fetch_test_[url_fail_4], ' Not undefined')
                }
                return response_fail_4.json();
            })
            .then(function (my_json) {
                var fail_4_nodes = JSON.parse(my_json.nodes_string)
                if (fail_4_nodes[0].node_type !== 'L_DB_DOWN') {
                    console.log('ERROR exist_nodes[0].strip_author === ', exist_nodes[0].strip_author, 'Not L_DB_DOWN')
                } else {
                    console.log('passed - url_fail_4');
                }
            })

        var url_pass_2 = window.origin + '/author/philip-k-dick?d';
        var vector_pass_2 = {test_time_vector: [1, 1000]};
        my.fetchTimeout(url_pass_2, vector_pass_2)
            .then(function (response_pass_2) {
                if (my._fetch_test_[url_pass_2] !== 2) {
                    console.log('ERROR response_pass_2 : ', my._fetch_test_[url_pass_2], ' Not 2')
                }
                return response_pass_2.json();
            })
            .then(function (my_json) {
                var pass_2_nodes = JSON.parse(my_json.nodes_string)
                if (pass_2_nodes[0].strip_author !== 'philip-k-dick') {
                    console.log('ERROR pass_2_nodes[0].strip_author === ', pass_2_nodes[0].strip_author, 'Not philip-k-dick')
                }
                {
                    console.log('passed - url_pass_2');
                }
            })

        var url_pass_3 = window.origin + '/author/philip-k-dick?e';
        var vector_pass_3 = {test_time_vector: [1, 1, 1000]};
        my.fetchTimeout(url_pass_3, vector_pass_3)
            .then(function (response_pass_3) {
                if (my._fetch_test_[url_pass_3] !== 3) {
                    console.log('ERROR response_pass_3 : ', my._fetch_test_[url_pass_3], ' Not 3')
                }
                return response_pass_3.json();
            })
            .then(function (my_json) {
                var pass_3_nodes = JSON.parse(my_json.nodes_string)
                if (pass_3_nodes[0].strip_author !== 'philip-k-dick') {
                    console.log('ERROR pass_3_nodes[0].strip_author === ', pass_3_nodes[0].strip_author, 'Not philip-k-dick')
                }
                {
                    console.log('passed - url_pass_3, last test');
                }
            })

        return 'Started _testFetch_()';
    }

    my._init_fetch_test_ = function (fetch_url) {
        if (typeof my._fetch_test_[fetch_url] === 'undefined') {
            my._fetch_test_[fetch_url] = 1;
        } else {
            my._fetch_test_[fetch_url]++;
        }
    }

    my.fetchTimeout = function (fetch_url, time_out, num_tries) {       // fetchTimeout('www.xe.com', 3000, 2)
        if (typeof time_out === 'object') {
            var is_test = true;
            num_tries = time_out.test_time_vector.length;
            var temp_time_out = time_out;
            my._init_fetch_test_(fetch_url);
            time_out = time_out.test_time_vector.shift();
        } else {
            var is_test = false;
        }
        var has_timed_out = false;
        return new Promise(function (resolve, reject) {
            if (num_tries == 0) {
                resolve(my.crash_response);
            }
            var rejectFetchSoon = function () {
                has_timed_out = true;
                reject(new Error(my.timeout_error));
            };
            var timeout_error = setTimeout(rejectFetchSoon, time_out);
            fetch(fetch_url)
                .then(function (good_response) {
                    clearTimeout(timeout_error);
                    if (!has_timed_out) {
                        resolve(good_response);
                    }
                })
                .catch(function (server_error) {
                    reject(server_error);
                });
        })
            .catch(function (catch_timeout_error) {
                if (is_test) {
                    time_out = temp_time_out;
                }
                return my.fetchTimeout(fetch_url, time_out, num_tries - 1);
            });
    }

    return my;

}());
// helper-functions end


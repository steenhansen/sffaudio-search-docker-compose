// helper-functions start
sff_js_vars.helpers = (function () {

    var my = {};

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
        return Object.keys(obj).length === 0;
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
        document.getElementById(id + '_rest').style.height = '1em';
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

    my.browserFetchRetry2 = function (fetch_url) {
        return sff_js_vars.helpers.browserFetchRetry(fetch_url, 2);
    }


    my.browserFetchRetry = function (fetch_url, num_tries, init_options) {
        return fetch(fetch_url, init_options)
            .catch(function (error) {
                if (num_tries < 2) {
                    throw error;
                }
                return browserFetchRetry(fetch_url, num_tries - 1, init_options);
            });
    }


    return my;

}());
// helper-functions end


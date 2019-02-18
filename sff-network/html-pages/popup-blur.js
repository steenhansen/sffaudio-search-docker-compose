
//popup-blur.css.js
sff_js_vars.blur_procs = (function (pop_up_id) {

    var my = {};

    my.keyDowns = function (event) {
        var key_code = event.keyCode;
        if (key_code == 27) {
            sff_js_vars.blur_procs.closePopUp();
        } else if (key_code == 37) {
            sff_js_vars.pdf_procs.loadOnePage('-');
        } else if (key_code == 39) {
            sff_js_vars.pdf_procs.loadOnePage('+');
        }
    };

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return '';
    }

    my.closePopUp = function () {
        var under_title = getQueryVariable('book');
        var strip_author = getQueryVariable('author');
        if (under_title) {
            sff_js_vars.history_state.replaceBook(strip_author, under_title);
        } else {
            sff_js_vars.history_state.replaceAuthor(strip_author);
        }
        if (window.location.search == '') {
            window.history.forward();
        }
        sff_js_vars.helpers.setDisplay(pop_up_id, 'none');
        sff_js_vars.helpers.setDisplay('media--title', 'none');
        sff_js_vars.helpers.setDisplay('mp3--player', 'none');
        var mp3_player = document.getElementById("mp3--player");
        mp3_player.src = '';
        sff_js_vars.helpers.setDisplay('post--container', 'none');
        document.getElementById('post--container').innerHTML = '';
        sff_js_vars.helpers.setDisplay('pdf--controller', 'none');
        sff_js_vars.helpers.setDisplay('pdf--canvas', 'none');
        sff_js_vars.pdf_procs.clearCanvas('pdf--canvas');
        sff_js_vars.helpers.setDisplay('pdf--loading', 'none');
        sff_js_vars.helpers.setDisplay('video--container', 'none');
        sff_js_vars.helpers.setDisplay('download--rsd--mp3', 'none');
        sff_js_vars.helpers.setDisplay('download--podcast--mp3', 'none');
        document.getElementById('video--player').src = '';
        document.getElementById("my--graph").style.display = "block";
    }

    my.postPdfWidth = function (post_pdf_container) {
        sff_js_vars.helpers.setDisplay(post_pdf_container, 'block');
    }

    my.mp3load = function (goto_url) {
        var mp3_player = document.getElementById("mp3--player");
        sff_js_vars.helpers.setDisplay("mp3--player", 'block');
        mp3_player.src = goto_url;
        mp3_player.load();
    }

    my.overlayHeightPx = function () {
        var window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientheight;
        var screen_height = document.documentElement.scrollHeight;
        if (screen_height > window_height) {
            var overlay_height = screen_height;
        } else {
            var overlay_height = window_height;
        }
        return overlay_height + 'px';
    }

    my.blockPage = function (container_id) {
        sff_js_vars.helpers.setDisplay(container_id, 'block');
        sff_js_vars.helpers.setDisplay('close--icon', 'block');
    }

    return my;

}('popup--container'));
//popup-blur.js end 

//popup-pdf    


sff_js_vars.pdf_procs = (function (canvas_id, pdf_close_svg) {

    var my = {
        canvas_id: canvas_id,
        pdf_canvas_height: '0px',
        pdf_js_lib: window['pdfjs-dist/build/pdf'],
        pdf_document: '',
        current_page: 0,
        last_page: 0,
        pdf_url: ''
    };

    my.historyPdf = function (pdf_url, book_title, label, last_first_underscores, under_title, req_query_view, sorted_choice, pdf_country) {
        this.pdf_url = pdf_url;
        this.pdf_country = pdf_country;
        if (!sff_js_vars.helpers.detectIE()) {
            if (req_query_view) {
                sff_js_vars.history_state.pushViewBook(last_first_underscores, under_title, req_query_view, sorted_choice);
            } else {
                sff_js_vars.history_state.pushBook(last_first_underscores, under_title);
            }
        }
        my.startPdf(pdf_url, book_title, label, last_first_underscores, under_title);
    }

    my.clearCanvas = function (canvas_id) {
        var pdf_canvas = document.getElementById(canvas_id);
        var pdf_context = pdf_canvas.getContext('2d');
        pdf_context.clearRect(0, 0, pdf_canvas.width, pdf_canvas.height);
    }

    my.setupPdf = function (book_title, label) {
        sff_js_vars.helpers.setDisplay("video--container", 'none');
        sff_js_vars.helpers.setDisplay("media--title", 'block');
        my.clearCanvas(my.canvas_id);
        sff_js_vars.helpers.setDisplay(my.canvas_id, 'block');
        document.getElementById('close--icon').src = pdf_close_svg;
        document.getElementById('media--title').innerHTML = book_title + ' - ' + label;
        sff_js_vars.helpers.setDisplay('pdf--loading', 'block');
    }


    my.startPdf = function (pdf_url, book_title, label) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        sff_js_vars.blur_procs.blockPage('popup--container');
        sff_js_vars.helpers.busyCursor();
        my.setupPdf(book_title, label);
        var resolved_pdf_url = my.decodeUrl(pdf_url);
        my.readPdf(resolved_pdf_url);
        sff_js_vars.helpers.normalCursor();
    }


    my.decodeUrl = function (before_htaccess_url) {
        var url_array = before_htaccess_url.split('/');
        var file_name = url_array.pop();
        if (this.pdf_country === 'Canada') {
            // The Phantom Flight
            var after_htaccess_url = 'https://sffaudiomediacan.s3.amazonaws.com/pdfs/' + file_name;
        } else {
            // beyond lies the wub
            var after_htaccess_url = 'https://nyc3.digitaloceanspaces.com/sffaudio-usa/usa-pdfs/' + file_name;
        }
        this.pdf_url = after_htaccess_url;
        return after_htaccess_url;
    }

    my.readPdf = function (pdf_url) {
        sff_js_vars.helpers.fetchTimeout(pdf_url, sff_constants.FETCH_WAIT_M_SEC, sff_constants.FETCH_RETRYS)
            .then(function (end_pdf_url) {
                my.pdf_js_lib.getDocument(end_pdf_url)
                    .then(function (loaded_pdf) {
                        my.pdf_document = loaded_pdf;
                        my.last_page = loaded_pdf.numPages;
                        my.loadOnePage(1);
                        sff_js_vars.helpers.setDisplay('pdf--controller', 'block');
                        sff_js_vars.helpers.normalCursor();
                    }).catch(function (e) {
                    var error_name = e.name;
                    if (error_name === "MissingPDFException") {
                        console.log('Missing PDF :', pdf_url);
                    } else if (error_name = "UnknownErrorException") {
                        console.log('CORS Access-Control-Allow-Origin missing :', pdf_url);
                    } else {
                        console.log('Unknown PDF error :', pdf_url, e)
                    }
                })
            }).catch(function (e) {
            my.downloadPdf(e);             // bypass CORS error SEC7118 on IE 11, Windows 7&8 bug
        })
    }

    my.downloadPdf = function (error) {    // e=== Error: Invalid parameter object: need either .data, .range or .url
        window.location = this.pdf_url;  // https://stackoverflow.com/questions/24646732/sec7118-xmlhttprequest-cors-ie-console-message
    }

    my.changePage = function (page_change) {
        if (page_change === 0) {
            var new_page = my.last_page;
        } else if ((page_change === '+') && (my.current_page < my.last_page)) {
            var new_page = my.current_page + 1;
        } else if ((page_change === '-') && (my.current_page > 1)) {
            var new_page = my.current_page - 1;
        } else if (page_change === 1) {
            var new_page = 1;
        } else {
            var new_page = my.current_page;
        }
        return new_page;
    }

    my.fixHeights = function () {
        var pager_height = sff_js_vars.helpers.computedHeight('pdf--controller');
        var pager_top = sff_js_vars.helpers.computedValue('pdf--controller', 'top');
        document.getElementById("pdf--canvas").style.top = pager_height + pager_top + 'px'
        sff_js_vars.helpers.overlayCoverScreen();
        var network_width = sff_js_vars.helpers.computedValue("my--network", "width");
        sff_js_vars.helpers.setDisplay('pdf--loading', 'none');
        var canvas_height = sff_js_vars.helpers.computedHeight('pdf--canvas');
        document.getElementById("opaque--cover").style.height = canvas_height + 'px';
    }

    my.renderOnePage = function (pdf_page) {
        var pdf_canvas = document.getElementById(my.canvas_id);
        var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var pdf_viewport = pdf_page.getViewport(1);
        var scale = screen_width * 1.1 / pdf_viewport.width;
        var scaledViewport = pdf_page.getViewport(scale);
        pdf_canvas.height = scaledViewport.height;
        pdf_canvas.width = scaledViewport.width;
        var pdf_context = pdf_canvas.getContext('2d');
        var render_context = {
            canvasContext: pdf_context,
            viewport: scaledViewport
        };
        my.pdf_canvas_height = pdf_canvas.height;
        return render_context;
    }

    my.loadOnePage = function (page_change) {
        my.current_page = my.changePage(page_change);
        my.pdf_document.getPage(my.current_page)
            .then(function (pdf_page) {
                var render_context = my.renderOnePage(pdf_page);
                pdf_page.render(render_context).then(function () {
                    my.fixHeights()
                });
            }), function (reason) {
            console.error(reason);
        };
    };

    return my;

}(sff_js_vars.pdf_vars.canvas_id,
    sff_js_vars.graph_vars.node_icons.I_CLOSE_PDF.image
))
//popup-pdf 









    var load_css_external = `
//popup-pdf    
sff_vars.pdf_procs = (function (canvas_id, pdf_close_svg) {

    var my = {
        canvas_id: canvas_id,
        pdf_canvas_height: '0px',
        pdf_js_lib: window['pdfjs-dist/build/pdf'],
        pdf_document: '',
        current_page: 0,
        last_page: 0,
        pdf_url:''
    };

    my.clearCanvas = function (canvas_id) {
        var pdf_canvas = document.getElementById(canvas_id);
        var pdf_context = pdf_canvas.getContext('2d');
        pdf_context.clearRect(0, 0, pdf_canvas.width, pdf_canvas.height);
    }

    my.setupPdf = function (book_title, label) {   
        sff_vars.helpers.setDisplay("video--container", 'none');
        sff_vars.helpers.setDisplay("media--title", 'block');
        my.clearCanvas(my.canvas_id);
        sff_vars.helpers.setDisplay(my.canvas_id, 'block');
        document.getElementById('close--icon').src = pdf_close_svg;
        document.getElementById('media--title').innerHTML = book_title + ' - ' + label;
        sff_vars.blur_procs.blockPage('popup--container');
        sff_vars.helpers.setDisplay('pdf--loading', 'block');
    }
    
    my.loadPdfForRsd = function (pdf_url, book_title, label, strip_author, under_title) {
        my.setupPdf(book_title, label);
            if (sff_php_vars.php_url === 'not a php host') {
                 var url_type3 =  'http://' + window.location.host + '/' + sff_vars.SFF_RESOLVE_PDF + pdf_url;
            }else{
                var url_type3 =  sff_php_vars.ajax_url + '/' + sff_vars.SFF_RESOLVE_PDF + pdf_url;
            }
            fetch(url_type3)
                .then(function (response) {
                    var text_promise = response.text();
                    return text_promise;
                })
                .then(function (resolved_pdf_url) {
                    my.readPdf(resolved_pdf_url);
                });
    }
    
    my.readPdf = function (pdf_url) {
        fetch(pdf_url)
            .then(function (end_pdf_url) {
                my.pdf_js_lib.getDocument(end_pdf_url)
                    .then(function (loaded_pdf) {
                        my.pdf_document = loaded_pdf;
                        my.last_page = loaded_pdf.numPages;
                        my.loadOnePage(1);
                        sff_vars.blur_procs.postPdfWidth('pdf--controller');
                        sff_vars.helpers.setDisplay('pdf--controller', 'block');
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
                my.downloadPdf();             // bypass CORS error SEC7118 on IE 11, Windows 7&8 bug
        })
    }

    my.loadPdf = function (pdf_url, book_title, label, strip_author, under_title, req_query_view) {
        this.pdf_url = pdf_url;
        if (req_query_view) {
            sff_vars.history_state.pushBookView(strip_author, under_title, req_query_view);
        } else {
            sff_vars.history_state.pushBook(strip_author, under_title);
        }
        my.loadPdfForRsd(pdf_url, book_title, label, strip_author, under_title);
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


    my.fixHeights = function (pdf_canvas_height) {
        var media_height =sff_vars.helpers.computedHeight('media--title');
        var pager_height =sff_vars.helpers.computedHeight('pdf--controller');
        var pager_top =sff_vars.helpers.computedValue('pdf--controller', 'top');
    
        var pop_cont_height = media_height + pager_height + pdf_canvas_height;
        document.getElementById("popup--container").style.height = pop_cont_height + 'px';
        document.getElementById("pdf--canvas").style.top = pager_height + pager_top + 'px'
        sff_vars.helpers.setDisplay('pdf--loading', 'none');
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
                    my.fixHeights(my.pdf_canvas_height)
                });
            }), function (reason) {
            console.error(reason);
        };
    };
    
    my.downloadPdf = function (){
        window.location = this.pdf_url;
    }
    
    return my;

}(  sff_vars.pdf_vars.canvas_id,
    sff_vars.graph_vars.node_icons.I_CLOSE_PDF.image
))
//popup-pdf 
`;
module.exports = load_css_external; 







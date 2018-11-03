module.exports = function () {
    var load_css_external = `
    
window.sff_pdf_procs = (function (pdf_proxy_url, canvas_id, pdf_close_svg) {

    var my = {
        pdf_proxy_url: pdf_proxy_url,
        canvas_id: canvas_id,
        pdf_canvas_height: '0px',
        pdf_js_lib: window['pdfjs-dist/build/pdf'],
        pdf_document: '',
        current_page: 0,
        last_page: 0
    };

    my.clearCanvas = function (canvas_id) {
        var pdf_canvas = document.getElementById(canvas_id);
        var pdf_context = pdf_canvas.getContext('2d');
        pdf_context.clearRect(0, 0, pdf_canvas.width, pdf_canvas.height);
    }

    my.loadPdf = function (pdf_url, book_title, label,strip_author, under_title) {
        sff_history_state.pushBook(strip_author, under_title);
        sff_helpers.setDisplay("media--title", 'block');
        my.clearCanvas(my.canvas_id);
        sff_helpers.setDisplay(my.canvas_id, 'block');
        document.getElementById('close--icon').src = pdf_close_svg;     
        document.getElementById('media--title').innerHTML = book_title + ' - ' + label;
        sff_blur_procs.blockPage('popup--container');
        sff_helpers.setDisplay('pdf--loading', 'block');
        my.pdf_js_lib.getDocument(pdf_url)
            .then(function (loaded_pdf) {
                my.pdf_document = loaded_pdf;
                my.last_page = loaded_pdf.numPages;
                my.loadOnePage(1);
                sff_blur_procs.postPdfWidth('pdf--controller');
                sff_helpers.setDisplay('pdf--controller', 'block');
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

    my.computedValue = function (element_id, value_name) {
        var html_element = document.getElementById(element_id);
        var computed_style = window.getComputedStyle(html_element);
        var computed_height = parseInt(computed_style.getPropertyValue(value_name), 10);
        return computed_height;
    }

    my.fixHeights = function (pdf_canvas_height) {

        var media_height = my.computedValue('media--title', 'height');
        var pager_height = my.computedValue('pdf--controller', 'height');
        var pager_top = my.computedValue('pdf--controller', 'top');
        var pop_cont_height = media_height + pager_height + pdf_canvas_height;
        document.getElementById("popup--container").style.height = pop_cont_height + 'px';
        document.getElementById("pdf--canvas").style.top = pager_height + pager_top + 'px'

         sff_helpers.setDisplay('pdf--loading', 'none');
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
    return my;

}(sff_pdf_vars.pdf_proxy_url,
    sff_pdf_vars.canvas_id,
    sff_graph_vars.node_icons.I_CLOSE_PDF.image
)) 


`;
    return load_css_external;

}







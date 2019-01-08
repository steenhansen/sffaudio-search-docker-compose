
    var load_css_external = `
//popup-pdf    
sff_js_vars.pdf_procs = (function (canvas_id, pdf_close_svg) {

    var my = {
        canvas_id: canvas_id,
        pdf_canvas_height: '0px',
        pdf_js_lib: window['pdfjs-dist/build/pdf'],
        pdf_document: '',
        current_page: 0,
        last_page: 0,
        pdf_url:''
    };


    my.historyPdf = function (pdf_url, book_title, label, last_first_underscores, under_title, req_query_view, sorted_choice) {
    console.log('historyPdf sorted_choice', sorted_choice)
        // document.getElementById("my--graph").style.display="none"; 
        this.pdf_url = pdf_url;
        if (req_query_view) {
            sff_js_vars.history_state.pushViewBook(last_first_underscores, under_title, req_query_view, sorted_choice);
        } else {
            sff_js_vars.history_state.pushBook(last_first_underscores, under_title);
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
       // sff_js_vars.blur_procs.blockPage('popup--container');
        sff_js_vars.helpers.setDisplay('pdf--loading', 'block');
    }
    

    my.startPdf = function (pdf_url, book_title, label) {
       this.pdf_url = pdf_url;
        my.setupPdf(book_title, label);
            if (sff_php_vars.php_url === 'not a php host') {
                 var url_type3 =  '//' + window.location.host + '/' + sff_js_vars.SFF_RESOLVE_PDF + pdf_url;
            }else{
                var url_type3 =  sff_js_vars.ajax_url + '/' + sff_js_vars.SFF_RESOLVE_PDF + pdf_url;
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
                        //sff_js_vars.blur_procs.postPdfWidth('pdf--controller');
                        sff_js_vars.helpers.setDisplay('pdf--controller', 'block');
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

   my.downloadPdf = function (){
        window.location = this.pdf_url;
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
        var media_height =sff_js_vars.helpers.computedHeight('media--title');
        var pager_height =sff_js_vars.helpers.computedHeight('pdf--controller');
        var pager_top =sff_js_vars.helpers.computedValue('pdf--controller', 'top');
        document.getElementById("pdf--canvas").style.top = pager_height + pager_top + 'px'
        var screen_height_px = sff_js_vars.blur_procs.overlayHeightPx();

          var header_height = sff_js_vars.helpers.computedValue("sff--header", "height");
          
           var my_network = document.getElementById("my--network")
           var popup_container = document.getElementById("popup--container")
        
        popup_container.style.height = screen_height_px;
        popup_container.style.top = my_network.style.top  + header_height*1.7;
        popup_container.style.left = my_network.style.left + 20;
        
        
        var network_width = sff_js_vars.helpers.computedValue("my--network", "width");
        
        popup_container.style.width = network_width-30;

        
        ////////////////////////////////////
        sff_js_vars.helpers.setDisplay('pdf--loading', 'none');
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
                    
                     sff_js_vars.blur_procs.blockPage('popup--container');
                    
                    
                });
            }), function (reason) {
            console.error(reason);
        };
    };
    
 
    
    return my;

}(  sff_js_vars.pdf_vars.canvas_id,
    sff_js_vars.graph_vars.node_icons.I_CLOSE_PDF.image
))
//popup-pdf 
`;
module.exports = load_css_external; 







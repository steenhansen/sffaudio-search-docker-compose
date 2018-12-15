
module.exports =  function (main_start_proc_name) {

var load_scripts = `
// load-scripts
var sff_browser_js_start = ${main_start_proc_name};

// https://tc39.github.io/ecma262/#sec-array.prototype.find   for IE
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var thisArg = arguments[1];
            var k = 0;
            while (k < len) {
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                k++;
            }
            return undefined;
        },
        configurable: true,
        writable: true
    });
}


function loadScript(url_src, done_callback) {
    var js_script = document.createElement('script');
    js_script.src = url_src;
    js_script.onload = function () {
        done_callback('polyfill_loaded');
    };
    js_script.onerror = function () {
        done_callback(new Error('Failed to load script ' + url_src));
    };
    document.head.appendChild(js_script);
}

function loadCss(url_href) {
    var css_sheet = document.createElement("link");
    css_sheet.rel = "stylesheet";
    css_sheet.type = "text/css";
    css_sheet.href = url_href;
    document.head.appendChild(css_sheet);
}

function loadScripts() {
    if (('vis' in window) && ('pdfjs-dist/build/pdf' in window) && ('Promise' in window) && ('fetch' in window)) {
        sff_browser_js_start('polyfill_none');
    } else {
        var vis_code_2 = 'https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js';
        var vis_css_2 = 'https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis-network.min.css';

        if ('vis' in window) {
            getPdf();
        } else {
            loadCss(vis_css_2);
            loadScript(vis_code_2, getPdf);
        }

        function getPdf() {
            if ('pdfjs-dist/build/pdf' in window) {
                getPromiseAndFetch();
            } else {
                var pdf_js_2 = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.489/build/pdf.min.js'
                loadScript(pdf_js_2, getPromiseAndFetch);
                getPromiseAndFetch();
            }

            function getPromiseAndFetch() {
                if (('Promise' in window) && ('fetch' in window)) {
                    sff_browser_js_start('polyfill_loaded');
                } else {
                    var promise_poly_1 = 'https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.5.2/bluebird.min.js';
                    var promise_poly_2 = 'https://unpkg.com/bluebird@3.5.2/js/browser/bluebird.min.js';
                    var fetch_poly_1 = 'https://cdn.jsdelivr.net/npm/unfetch@4.0.1/polyfill/index.js';
                    var fetch_poly_2 = 'https://unpkg.com/unfetch@4.0.1/polyfill/index.js';
                    loadScript(promise_poly_1, checkPromisePoly);
                    function checkPromisePoly(bluebird_status) {
                        if (bluebird_status === 'polyfill_loaded') {
                            loadUnFetch('polyfill_loaded');
                        } else {
                            loadScript(promise_poly_2, loadUnFetch);
                        }
                    };

                    function loadUnFetch(bluebird_status) {
                        if (bluebird_status === 'polyfill_loaded') {
                            loadScript(fetch_poly_1, checkUnFetchPoly);

                            function checkUnFetchPoly(unfetch_status) {
                                if (unfetch_status === 'polyfill_loaded') {
                                    sff_browser_js_start('polyfill_loaded');
                                } else {
                                    loadScript(fetch_poly_2, sff_browser_js_start);
                                }
                            };
                        } else {
                            sff_browser_js_start(bluebird_status);
                        }
                    };
                }
            };
        }
    }
}

loadScripts();
//load-scripts end
`;
return load_scripts;

}


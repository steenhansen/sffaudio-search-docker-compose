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
    if (('vis' in window) && ('Promise' in window) && ('fetch' in window) && ('pdfjs-dist/build/pdf' in window)) {
        sff_constants.START_FUNC('polyfill_none');
    } else {
        if ('vis' in window) {
            getPromise();
        } else {
            var vis_code_2 = 'https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js';
            var vis_css_2 = 'https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis-network.min.css';
            loadCss(vis_css_2);
            loadScript(vis_code_2, getPromise);
        }
        function getPromise() {
            if ('Promise' in window) {
                getFetch();
            } else {
                var promise_poly_1 = 'https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.5.2/bluebird.min.js';
                loadScript(promise_poly_1, checkPromisePoly);
                function checkPromisePoly(bluebird_status) {
                    if (bluebird_status === 'polyfill_loaded') {
                        getFetch();
                    } else {
                        var promise_poly_2 = 'https://unpkg.com/bluebird@3.5.2/js/browser/bluebird.min.js';
                        loadScript(promise_poly_2, getFetch);
                    }
                }
            }
            function getFetch() {
                if ('fetch' in window) {
                    getPdf();
                } else {
                    var fetch_poly_1 = 'https://cdn.jsdelivr.net/npm/unfetch@4.0.1/polyfill/index.js';
                    loadScript(fetch_poly_1, checkFetchPoly);
                    function checkFetchPoly(fetch_status) {
                        if (fetch_status === 'polyfill_loaded') {
                            getPdf();
                        } else {
                            var fetch_poly_2 = 'https://unpkg.com/unfetch@4.0.1/polyfill/index.js';
                            loadScript(fetch_poly_2, getPdf);
                        }
                    }
                }
                function getPdf() {
                    if ('pdfjs-dist/build/pdf' in window) {
                        sff_constants.START_FUNC('polyfill_loaded');
                    } else {
                        var pdf_js_2 = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.489/build/pdf.min.js'
                        loadScript(pdf_js_2, sff_constants.START_FUNC);
                    }
                }
            };
        };
    }
}

loadScripts();
//load-scripts end



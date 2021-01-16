/* to optimize svgs 
 - change fill:"${fill_in_color}" to fill:"#123456" so can put variable back in 

 - https://petercollingridge.appspot.com/svg-editor/        -- optimize svgs

 https://material.io/tools/icons/?icon=person&style=sharp
 https://www.shareicon.net/
 */
var graph_constants = rootAppRequire('common-node/graph-constants');
var background_color = graph_constants.DARK_BACKGROUND;

function db_down_icon(hover_color) {
    var svg_all = `<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" height="1000" width="1000" xml:space="preserve" viewBox="0 0 1000 1000" y="0" x="0" version="1.1">
<circle stroke-miterlimit="4" r="474.2" cy="497.7" cx="498.3" style="fill:${hover_color};stroke-width:20.1"/><g transform="matrix(1.7819606,0,0,1.7819606,144.69423,69.402958)"><path d="m231.1 239.9c-2.3-4-7.3-6.8-11.8-6.8H97c-4.6 0-9.5 2.9-11.8 6.8L24 345.9c-2.3 4-2.3 9.7 0 13.7L85.1 465.5c2.3 4 7.3 6.8 11.8 6.8h122.3c4.6 0 9.5-2.9 11.8-6.8l61.2-105.9c2.3-4 2.3-9.7 0-13.7zm-73 171c-32.1 0-58.2-26.1-58.2-58.2 0-32.1 26.1-58.2 58.2-58.2 32.1 0 58.2 26.1 58.2 58.2 0 32.1-26.1 58.2-58.2 58.2zM448.3 225.1l-36.2-62.7c-2.3-4-7.3-6.8-11.8-6.8h-72.4c-4.6 0-9.5 2.9-11.8 6.8l-36.2 62.7c-2.3 4-2.3 9.7 0 13.7l36.2 62.7c2.3 4 7.3 6.8 11.8 6.8h72.4c4.6 0 9.5-2.9 11.8-6.8l36.2-62.7c2.3-4 2.3-9.7 0-13.7zm-84.2 34.2c-15.1 0-27.3-12.3-27.3-27.3 0-15.1 12.3-27.3 27.3-27.3 15.1 0 27.3 12.3 27.3 27.3 0 15.1-12.3 27.3-27.3 27.3zM65.2 140.9l49.7 49.3c2.1 2.1 5.7 3.5 8.6 3.5l70-0.3c3 0 6.5-1.5 8.6-3.6l49.3-49.7c2.1-2.1 3.6-5.7 3.6-8.7l-0.3-70c0-3-1.5-6.5-3.6-8.6L201.4 3.5C199.3 1.5 195.7 0 192.7 0l-70 0.3c-3 0-6.5 1.5-8.6 3.6L64.8 53.6c-2.1 2.1-3.6 5.7-3.5 8.7l0.3 70c0 3 1.5 6.5 3.6 8.6zm92.8-85.3h0.2c22.6 0 41.1 18.4 41.2 41.1 0.1 22.7-18.3 41.3-41.1 41.4h-0.2c-22.6 0-41.1-18.4-41.2-41.1-0.1-22.7 18.3-41.3 41.1-41.4z"/></g>
<g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/><g transform="translate(0,527.69699)"/></svg>
`;
    return visJsGraphShape(svg_all);
}


function book_icon(hover_color) {
    var svg_all = `<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" version="1.1">
<style>.s0{fill:#fff;stroke-width:1.5;}</style><g transform="matrix(10.562294,0,0,10.562294,26.794337,23.152316)">
<circle stroke-miterlimit="4" r="44.9" cy="44.9" cx="44.9" style="fill:${hover_color};stroke-width:1.9"/><path stroke="null" d="M71 22.6V15.6l-26.7 7z" stroke-opacity="null" class="s0"/><rect stroke="null" height="44.9" width="62.5" y="21.2" x="12.4" fill-opacity="null" stroke-opacity="null" class="s0"/><path d="m76.5 24.3v-4.2h-4.4v-5.3l-28.3 5.3h-32.5v4.2h-2.4v44.9h70.1v-44.9zm-63 0v-1.8h29.1v1.8 40.8h-29.1zm43-4.2 13.2-2.4v2.5 1.2 1.2 1.8 36l-24.7 4.6v-40.5-1.8-0.2l5.2-1zm17.6 4.2v40.8h-17.6l15.5-2.9v-37.9-1.8h2.1zm-25.8 30-0.6-2.3 18.5-5 0.6 2.3zm-0.2 6.3-0.6-2.3 18.5-5 0.6 2.3zm0.5-30.3-0.6-2.2 13.4-3.7 4.6-1.3 0.4 1.3 0.3 1zm0 6-0.6-2.2 18-5 0.6 2.2zm0 6-0.6-2.2 18.1-5 0.6 2.3zm0 6-0.6-2.2 18.1-5 0.6 2.3zm-31.8 4.4h22.9v2.3h-22.9zm-0.2 6.3h22.9v2.3h-22.9zm22.9-16h-22.5v-2.3h22.5zm0 6h-22.5v-2.3h22.5z"/></g></svg>
`;
    return visJsGraphShape(svg_all);
}


function fit_graph_shape(w_color) {
    var svg_wikipedia = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" height="1000" width="1000" version="1.1" x="0" y="0" viewBox="0 0 1000 1000" xml:space="preserve">
<style>.s0{fill:#010002;stroke-width:1.4;}</style><g transform="translate(129.2705,362.2655)">
<circle cx="371.8" cy="137" r="468.8" style="fill:${w_color};stroke-width:39.1"/></g><g transform="matrix(1.5429094,0,0,1.5429094,-417.98011,-115.87001)">
<g transform="matrix(7.9446675,0,0,7.9446675,396.66417,203.46109)"><polygon points="0 49.5 28.9 49.6 20.5 41.1 41.1 20.5 49.6 28.9 49.6 0 20.6 0 29.1 8.5 8.5 29.1 0 20.6 "/></g></g></svg>
`;
    return visJsGraphShape(svg_wikipedia);
}

// warning the google 'G' when optimizing must keep "Namespaces:xlink" and NOT "Remove IDs (breaks gradients)"
function google_icon(w_color) {
    var svg_all = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000" version="1.1" id="svg16" width="1000" height="1000">
<metadata id="metadata20"/><defs id="defs3"><path id="a" d="M44.5 20H24v8.5H35.8C34.7 33.9 30.1 37 24 37 16.8 37 11 31.2 11 24c0-7.2 5.8-13 13-13 3.1 0 5.9 1.1 8.1 2.9L38.5 7.5C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24c0 12.2 9.8 22 22 22 11 0 21-8 21-22 0-1.3-0.2-2.7-0.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible" id="use5" x="0" y="0" width="100" height="100"/></clipPath><g transform="translate(-392.34236,805.44068)" id="g844">
<circle r="468.8" cy="-301.24" cx="889.45" id="circle838" style="fill:${w_color};stroke-width:39.1"/><g id="g1408" transform="matrix(15.694894,0,0,15.694894,517.30265,-684.05273)"><g id="g1401"><path clip-path="url(#b)" d="M0 37V11l17 13z" id="path8" fill="#fbbc05"/><path clip-path="url(#b)" d="M0 11 17 24 24 17.9 48 14V0H0Z" id="path10" fill="#ea4335"/><path clip-path="url(#b)" d="M0 37 30 14 37.9 15 48 0V48H0Z" id="path12" fill="#34a853"/><path clip-path="url(#b)" d="M48 48 17 24 13 21 48 11Z" id="path14" fill="#4285f4"/></g></g></g></svg>
`;
    return visJsGraphShape(svg_all);
}

function zoom_out_shape(w_color) {
    var svg_wikipedia = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 1000 1000" y="0" x="0" version="1.1" width="1000" height="1000">
<style>.s0{fill:#010002;stroke-width:1.4;}</style><g transform="translate(129.2705,362.2655)"><circle r="468.8" cy="137" cx="371.8" style="fill:${w_color};stroke-width:39.1"/><circle cx="481.8" cy="38.8" r="263.4" fill="#fff"/><path d="m605.5 15.8h-112.9-45.2-112.9c-12.4 0-22.6 10.1-22.6 22.6 0 12.5 10.2 22.6 22.6 22.6h112.9 45.2 112.9c12.5 0 22.6-10.1 22.6-22.6 0-12.5-10.1-22.6-22.6-22.6zM470-255.2c-162.2 0-293.6 131.5-293.6 293.6 0 69.8 24.4 133.8 65.1 184.2L50 413.9c-12.2 12.2-12.2 32.1 0 44.4 12.2 12.2 32.1 12.2 44.3 0L285.7 266.9c50.5 40.7 114.4 65.1 184.2 65.1 162.2 0 293.6-131.5 293.6-293.6 0-162.2-131.4-293.6-293.6-293.6zm0 542.1c-137 0-248.5-111.4-248.5-248.5 0-137 111.4-248.5 248.5-248.5 137 0 248.5 111.4 248.5 248.5 0 137-111.4 248.5-248.5 248.5z" class="s0"/></g></svg>`;
    return visJsGraphShape(svg_wikipedia);
}

function zoom_in_shape(w_color) {
    var svg_wikipedia = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 1000 1000" y="0" x="0" version="1.1" width="1000" height="1000">
<style>.s0{fill:#010002;stroke-width:1.4;}</style><g transform="translate(129.2705,362.2655)"><circle r="467.3" cy="138.4" cx="370.3" style="fill:${w_color};stroke-width:38.9"/><circle cx="480" cy="40.5" r="262.5" fill="#fff"/><path d="m468.2-252.5c-161.7 0-292.7 131-292.7 292.7 0 69.6 24.4 133.3 64.8 183.6L49.6 414.5c-12.2 12.2-12.2 32 0 44.2 12.2 12.2 32 12.2 44.2 0L284.5 268c50.3 40.5 114.1 64.9 183.6 64.9 161.7 0 292.7-131 292.7-292.7 0-161.7-131-292.7-292.7-292.7zm0 540.4c-136.6 0-247.7-111.1-247.7-247.7 0-136.6 111.1-247.7 247.7-247.7 136.6 0 247.7 111.1 247.7 247.7 0 136.6-111.1 247.7-247.7 247.7zM603.3 17.7H490.7V-94.9c0-12.4-10.1-22.5-22.5-22.5-12.4 0-22.5 10.1-22.5 22.5V17.7H333.1c-12.4 0-22.5 10.1-22.5 22.5 0 12.4 10.1 22.5 22.5 22.5H445.7V175.3c0 12.4 10.1 22.5 22.5 22.5 12.4 0 22.5-10.1 22.5-22.5V62.7H603.3c12.4 0 22.5-10.1 22.5-22.5 0-12.4-10.1-22.5-22.5-22.5z" class="s0"/></g></svg>`;
    return visJsGraphShape(svg_wikipedia);
}

function wikipedia_icon(hover_color) {   
    var svg_wikipedia = `<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" version="1.1">
<ellipse ry="461.3" rx="462.2" cy="498.2" cx="500.7" style="fill:${hover_color};stroke-width:12.6"/><g transform="matrix(1.3353056,0,0,1.3353056,119.64887,5.2717179)"><path stroke="null" d="m158.8 150.9 127.8-116.9 125.2 119.7-63.3-0.7-1.3 118.9-126.5-1.4 1.3-118.9-63.3-0.7h0z" stroke-opacity="null" style="fill:#ff7f00;stroke-width:3.9"/><path stroke-opacity="null" d="M267.9 688.3 53.5 290.8l449.1 0.1z" fill="#fff"/><path d="m480.1 271-399.5 0.1c-19.6 0-33.5 6.9-40.2 18.1-6.7 11.3-6 27 3.7 44.3l193.1 342.9c19.3 34.5 50.1 36.9 68.8 5.5l211.6-353.9c18.7-31.4 1.9-56.9-37.6-56.9zM271.7 673.6c-1.4-1.2-4-3.8-7.1-9.3l-193.1-342.9c-4.6-8.2-4.7-13.7-3.4-15.9 1.3-2.2 6.2-4.8 15.5-4.8l399.5-0.1c5.7 0 9.1 0.8 11 1.4-0.3 1.8-1.1 4.9-3.8 9.4l-211.6 353.9c-3 5-5.5 7.2-6.9 8.2z" fill="#1a1a1a"/><path stroke="null" d="m449.9 334.4c0 1.2-0.4 2.4-1.2 3.4-0.8 1-1.6 1.5-2.6 1.5-7.7 0.7-14.1 3.1-19 7.3-4.9 4.1-10 12-15.2 23.6l-79.9 175.9c-0.5 1.6-2 2.4-4.4 2.4-1.9 0-3.3-0.8-4.4-2.4l-44.8-91.5-51.5 91.5c-1.1 1.6-2.5 2.4-4.4 2.4-2.3 0-3.8-0.8-4.6-2.4L139.5 370.2c-4.9-10.9-10.1-18.5-15.5-22.9-5.4-4.3-13-7-22.7-8-0.8 0-1.6-0.4-2.4-1.3-0.7-0.8-1.1-1.8-1.1-3 0-2.9 0.8-4.3 2.5-4.3 7 0 14.3 0.3 22 0.9 7.1 0.6 13.8 0.9 20 0.9 6.4 0 13.9-0.3 22.6-0.9 9.1-0.6 17.1-0.9 24.1-0.9 1.7 0 2.5 1.4 2.5 4.3 0 2.8-0.5 4.3-1.5 4.3-7 0.5-12.5 2.3-16.5 5.2-4 3-6 6.8-6 11.6 0 2.4 0.8 5.5 2.5 9.2l64.9 143.1 36.8-67.9-34.3-70.3c-6.2-12.5-11.2-20.6-15.2-24.3-4-3.6-10-5.8-18-6.7-0.7 0-1.4-0.4-2.1-1.3-0.7-0.8-1-1.8-1-3 0-2.9 0.7-4.3 2.2-4.3 7 0 13.4 0.3 19.3 0.9 5.6 0.6 11.6 0.9 18 0.9 6.3 0 12.9-0.3 19.9-0.9 7.2-0.6 14.3-0.9 21.3-0.9 1.7 0 2.5 1.4 2.5 4.3 0 2.8-0.5 4.3-1.5 4.3-14 0.9-21 4.8-21 11.6 0 3.1 1.6 7.8 4.9 14.2l22.7 45 22.6-41.2c3.1-5.8 4.7-10.7 4.7-14.7 0-9.4-7-14.4-21-15-1.3 0-1.9-1.4-1.9-4.3 0-1 0.3-2 0.9-2.9 0.7-0.9 1.3-1.4 1.9-1.4 5 0 11.2 0.3 18.5 0.9 7 0.6 12.8 0.9 17.2 0.9 3.2 0 8-0.3 14.2-0.8 7.9-0.7 14.6-1.1 19.9-1.1 1.2 0 1.9 1.2 1.9 3.7 0 3.3-1.1 4.9-3.4 4.9-8.1 0.8-14.7 3-19.7 6.6-5 3.6-11.1 11.7-18.6 24.3l-30.1 54.4 40.8 81.1 60.2-136.7c2.1-5 3.1-9.6 3.1-13.8 0-10-7-15.3-21-15.9-1.3 0-1.9-1.4-1.9-4.3 0-2.9 0.9-4.3 2.8-4.3 5.1 0 11.2 0.3 18.2 0.9 6.5 0.6 11.9 0.9 16.3 0.9 4.6 0 9.9-0.3 16-0.9 6.3-0.6 11.9-0.9 16.9-0.9 1.5 0 2.2 1.2 2.2 3.7z" style="fill:#f0f;stroke-width:2.8"/></g></svg>

`;
    return visJsGraphShape(svg_wikipedia);
}

function post_icon(hover_color) {
    var svg_all = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" version="1.1">
<style>.s0{fill:#fff;}.s1{fill:#009ccd;}.s2{fill:#666;}.s3{fill:#000;}</style>
<g transform="matrix(1.1485838,0,0,1.1485838,44.93158,47.843122)"><ellipse ry="392.5" rx="404" cx="405.5" cy="393.8" stroke-miterlimit="4" style="fill:${hover_color};stroke-width:16.5"/></g><g transform="matrix(1.1485838,0,0,1.1485838,161.93139,156.06796)" stroke="null"><g stroke="null"><path d="m10.5 50.5c0-22.1 17.9-40 40-40h500c22.1 0 40 17.9 40 40v500c0 22.1-17.9 40-40 40h-500c-22.1 0-40-17.9-40-40zM300.5 300.5" stroke="null"/></g></g><g transform="matrix(1.1485838,0,0,1.1485838,161.93139,156.06796)"><g stroke="null"><g stroke="null"><path stroke="null" d="m42.5 65.8c0-12.9 10.4-23.3 23.3-23.3h466.4c12.9 0 23.3 10.4 23.3 23.3v466.4c0 12.9-10.4 23.3-23.3 23.3H65.8c-12.9 0-23.3-10.4-23.3-23.3zM299 299" fill="#fff"/></g></g><path d="m429.7 177.6c-14-8.1-30-19.3-42-30.7-0.5 6.4 0.1 13 1.8 19.5 8.2 30.5 39.6 48.6 70.1 40.5 6.6-1.8 12.5-4.6 17.8-8.3-14.5-4.1-31.3-11.4-47.7-20.9zM513.8 191.6c4.2-6.1-0.3-16.2-12.9-29.4 1.5-8.1 1.3-16.8-0.9-25.3-8.2-30.6-39.6-48.7-70.1-40.5-8.7 2.3-16.3 6.5-22.6 12-21.7-6.5-30.8 0.3-31.7 3.4-8.7 16.4 29 46.2 56.4 61.9 23.4 13.4 70.7 34.2 81.9 17.9zm-79.6-22c-38.1-22.4-59.6-47.1-54.6-55.5 2.3-4 11.3-4.8 23.8-2-5.1 5.4-9.2 11.7-11.9 18.6 8.6 10 24.3 23 45.1 34.9 17.4 10 35.2 17.8 52.8 21.7 4.6-5.8 8-12.4 10.1-19.7 8.7 9.5 12.8 17.8 10.2 21.6-6.8 10.1-46.4-2.4-75.5-19.6z" fill="#009ccd"/><path d="m161.6 115.5c-0.6-0.6-0.9-0.3-1-0.2-3.7 3.7-6.9 12.5-5.2 11.6 6.2-3.1 7.3-2.2 10.9-5.9 0.1-0.1 0.5-0.4-0.2-1zM181.3 115.4c-0.2-0.5 0.2-0.8 0.3-0.9 8.1-8.7 13.2-20.3 9.4-24.1-3.8-3.8-15 1.5-23.7 9.5-0.2 0.2-0.5 0.5-1.1 0.3l-2.7-0.6c-0.8-0.2-1.8 0.1-2.4 0.7l-9.9 9.9c-0.5 0.5-0.4 1.1 0.4 1.2l7.2 1.1c0.8 0.1 1.8-0.2 2.4-0.8 0 0 0.4-0.4 0.7 0 2.1 2.1 5.9 5.9 7.8 7.8 0.4 0.4 0 0.8 0 0.8-0.5 0.5-0.9 1.6-0.8 2.4l1.1 7.2c0.1 0.8 0.7 0.9 1.2 0.4l9.9-9.9c0.5-0.5 0.8-1.6 0.7-2.4zm-0.5-15c-1.7-1.7-1.7-4.4 0-6.1 1.7-1.7 4.4-1.7 6.1 0 1.7 1.7 1.7 4.4 0 6.1-1.7 1.7-4.4 1.7-6.1 0z" fill="#666"/><text y="168" x="108" xml:space="preserve" stroke-miterlimit="4" font-size="38.2" font-weight="normal" font-style="normal" style="fill:#666;font-family:'Century Gothic';font-size:38.2;stroke-width:1.8;stroke:#666;text-anchor:start">SFFaudio</text><rect width="102" height="71" x="127" y="190" fill="#009ccd"/><rect width="293" height="12" x="127" y="298" fill="#000"/><rect width="293" height="12" x="127" y="348" fill="#000"/><rect width="293" height="12" x="127" y="394" fill="#000"/><rect width="293" height="12" x="127" y="439" fill="#000"/><rect y="178" x="264" height="50" width="244" fill="#fff"/><rect stroke="null" y="85" x="478" height="162" width="44" fill="#fff"/></g></svg>
`;
    return visJsGraphShape(svg_all);
}

function pdf_icon(hover_color) {   
    var svg_all = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1000 1000" width="1000" height="1000">
<style>.s0{fill:#fff;}</style><ellipse ry="459.8" rx="460.8" cy="494.6" cx="501.6" style="fill:${hover_color};stroke-width:12.5"/><g transform="matrix(1.3311963,0,0,1.3311963,118.45942,13.771965)"><path d="M496.7 198.7 425.3 127.3C409.7 111.7 379 99 357 99H117c-22 0-40 18-40 40v432c0 22 18 40 40 40h368c22 0 40-18 40-40V267c0-22-12.7-52.7-28.3-68.3z" fill="#000"/><path d="m493 571c0 4.3-3.7 8-8 8H117c-4.3 0-8-3.7-8-8V139c0-4.3 3.7-8 8-8h240c2.4 0 5.1 0.3 8 0.9v127.2h127.1c0.6 2.9 0.9 5.6 0.9 8v304z" fill="#fff"/><path d="m459.5 415.8c-2.1 1.3-8.1 2.1-11.9 2.1-12.4 0-27.6-5.7-49.1-14.9 8.3-0.6 15.8-0.9 22.6-0.9 12.4 0 16 0 28.2 3.1 12.1 3 12.2 9.3 10.2 10.6zm-215.1 1.9c4.8-8.4 9.7-17.3 14.7-26.8 12.2-23.1 20-41.3 25.7-56.2 11.5 20.9 25.8 38.6 42.5 52.8 2.1 1.8 4.3 3.5 6.7 5.3-34.1 6.8-63.6 15-89.6 24.9zm39.8-218.9c6.8 0 10.7 17.1 11 33.2 0.3 16-3.4 27.2-8.1 35.6-3.9-12.4-5.7-31.8-5.7-44.5 0 0-0.3-24.3 2.8-24.3zM150.8 506c3.9-10.5 19.1-31.3 41.6-49.8 1.4-1.1 4.9-4.4 8.1-7.4-23.5 37.6-39.3 52.5-49.7 57.2zM466 393.7c-6.8-6.7-22-10.2-45-10.5-15.6-0.2-34.3 1.2-54.1 3.9-8.8-5.1-17.9-10.6-25.1-17.3-19.2-18-35.2-42.9-45.2-70.3 0.6-2.6 1.2-4.8 1.7-7.1 0 0 10.8-61.5 7.9-82.3-0.4-2.9-0.6-3.7-1.4-5.9l-0.9-2.5c-2.9-6.8-8.7-14-17.8-13.6l-5.3-0.2h-0.1c-10.1 0-18.4 5.2-20.5 12.8-6.6 24.3 0.2 60.5 12.5 107.4l-3.2 7.7c-8.8 21.4-19.8 43-29.5 62l-1.3 2.5c-10.2 20-19.5 37-27.9 51.4l-8.7 4.6c-0.6 0.4-15.5 8.2-19 10.3-29.6 17.7-49.3 37.8-52.5 53.8-1 5-0.3 11.5 5 14.6l8.4 4.2c3.6 1.8 7.5 2.7 11.4 2.7 21.1 0 45.6-26.2 79.3-85.1 39-12.7 83.4-23.3 122.3-29.1 29.6 16.7 66 28.3 89 28.3 4.1 0 7.6-0.4 10.5-1.2 4.4-1.1 8.1-3.6 10.4-7.1 4.4-6.7 5.4-15.9 4.1-25.4-0.3-2.8-2.6-6.3-5-8.7z" fill="#f00"/><path d="m474.1 221.3c1.6 1.6 3.1 3.5 4.6 5.7H397v-81.7c2.2 1.5 4.1 3.1 5.7 4.6z" fill="#fff"/></g></svg>
`;
    return visJsGraphShape(svg_all);
}



function rsd_icon(w_color) {
    var svg_rsd = `
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" version="1.1" width="1000" height="1000">
<style>.s0{fill:#00f;}</style><style>.s0{fill:#00f;}</style><defs><pattern y="0" x="0" height="6" width="6" patternUnits="userSpaceOnUse"/></defs>
<path d="m966.6 501.9c0 260.2-211 470.6-472.2 470.6-260.7 0-471.7-211-471.7-470.6 0-260.2 211-470.6 471.7-470.6 260.7 0 472.2 211 472.2 470.6z" style="fill:${w_color};stroke-width:5.4"/><g transform="matrix(5.4089894,0,0,5.4089894,148.29244,152.70331)"><circle cx="64.1" cy="63.8" r="57.5" style="fill:#fff;stroke-width:8;stroke:#000"/><path stroke="null" stroke-width="null" stroke-opacity="null" d="M67 22.9" style="fill:#3b2f0e;opacity:0.5"/><g stroke="null" display="inline"><g stroke="null"><path stroke="null" d="m52.1 35.7zm7.4 23.6 0.4 6.5H70.6L71 59.3Z" fill="#00f"/></g><g stroke="null"><path stroke="null" d="m52.1 35.7zm8 32.8 1 15.9v0c0.1 1.4 0.6 2.3 1.4 2.9 0.8 0.6 1.8 1 2.9 1 1.1 0 2.1-0.4 2.9-1 0.8-0.6 1.3-1.5 1.4-2.9v0l0.8-15.9z" fill="#00f"/></g><g stroke="null"><path stroke="null" d="m52.1 35.7zm-1.3 41.5c-0.7 0-1.3 0.6-1.3 1.3v11.9c0 5.1 3.9 8.4 8 8.8 2 0.2 4.2-0.3 5.9-1.6 1.7-1.3 2.9-3.4 3.2-6.2 0 0 0-0.1 0-0.1C66 91.6 65.8 91.6 65 91.5 64.3 91.4 64.1 91 63.9 91c0 0.1 0 0.2 0 0.4-0.3 2.1-1.1 3.4-2.2 4.2-1.1 0.9-2.5 1.2-4 1.1C54.8 96.4 52 94.3 52 90.5V78.6c0-0.7-0.6-1.3-1.3-1.3v0z" fill="#00f"/></g><g stroke="null"><path stroke="null" d="m52.1 35.7zm6.8 13.1 0.5 7.9h11.9l0.5-7.9z" fill="#00f"/></g><g stroke="null"><path stroke="null" d="m65.3 22.4c-7.3 0-13.2 5.9-13.2 13.3 0 0.5 0 0.9 0.1 1.4 0 0.4 0.1 0.9 0.2 1.3 0.1 0.4 0.2 0.9 0.3 1.3 0.1 0.4 0.3 0.8 0.4 1.2 0.2 0.4 0.4 0.8 0.6 1.2 0.2 0.4 0.4 0.7 0.7 1.1 0.2 0.4 0.5 0.7 0.8 1 0.3 0.3 0.6 0.6 0.9 0.9 0.3 0.3 0.6 0.6 0.9 0.9 0.1 0.1 0.2 0.1 0.3 0.2 0.1 0 0.2 0 0.3 0h15.6c0.1 0 0.2 0 0.3 0 0.1-0.1 0.2-0.1 0.3-0.2 0.3-0.3 0.6-0.6 0.9-0.9 0.3-0.3 0.6-0.6 0.9-0.9 0.3-0.3 0.5-0.7 0.8-1 0.2-0.4 0.5-0.7 0.7-1.1 0.2-0.4 0.4-0.8 0.6-1.2 0.2-0.4 0.3-0.8 0.4-1.2 0.1-0.4 0.2-0.8 0.3-1.3 0.1-0.4 0.2-0.9 0.2-1.3 0-0.5 0.1-0.9 0.1-1.4 0-7.4-5.9-13.3-13.2-13.3z" fill="#00f"/></g><g stroke="null"><path stroke="null" d="m59.9 25.1c0 0 0.1 0 0.1 0 0.7 0 1.3 0.6 1.3 1.3 0 0.7-0.6 1.3-1.3 1.3-0.7 0-1.3-0.6-1.3-1.3 0-0.7 0.5-1.3 1.2-1.3zm5.3 0c0 0 0.1 0 0.1 0 0.7 0 1.3 0.6 1.3 1.3 0 0.7-0.6 1.3-1.3 1.3-0.7 0-1.3-0.6-1.3-1.3 0-0.7 0.5-1.3 1.2-1.3zm5.3 0c0 0 0.1 0 0.1 0 0.7 0 1.3 0.6 1.3 1.3 0 0.7-0.6 1.3-1.3 1.3-0.7 0-1.3-0.6-1.3-1.3 0-0.7 0.5-1.3 1.2-1.3zm-13.2 4c0 0 0.1 0 0.1 0 0.7 0 1.3 0.6 1.3 1.3 0 0.7-0.6 1.3-1.3 1.3-0.7 0-1.3-0.6-1.3-1.3 0-0.7 0.5-1.3 1.2-1.3zm5.3 0c0 0 0.1 0 0.1 0 0.7 0 1.3 0.6 1.3 1.3 0 0.7-0.6 1.3-1.3 1.3-0.7 0-1.3-0.6-1.3-1.3 0-0.7 0.5-1.3 1.2-1.3zm5.3 0c0 0 0.1 0 0.1 0 0.7 0 1.3 0.6 1.3 1.3 0 0.7-0.6 1.3-1.3 1.3-0.7 0-1.3-0.6-1.3-1.3 0-0.7 0.5-1.3 1.2-1.3zm5.3 0c0 0 0.1 0 0.1 0 0.7 0 1.3 0.6 1.3 1.3 0 0.7-0.6 1.3-1.3 1.3-0.7 0-1.3-0.6-1.3-1.3 0-0.7 0.5-1.3 1.2-1.3z" fill="#fff"/></g></g></g></svg>`;
    return visJsGraphShape(svg_rsd);
}

function rsd_video(w_color) {
    var svg_video = `
 <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" version="1.1">
<style>.s0{opacity:1;}.s1{fill:#fff;}</style><metadata>image/svg+xmlimage/svg+xmlimage/svg+xml</metadata><g transform="matrix(1.1436805,0,0,1.1436805,-19.230962,-28.92848)"><path d="M864.5 463.6C864.5 690.9 679.8 875 452.2 875 224.5 875 39.9 690.8 39.9 463.6 39.9 236.3 224.5 52.2 452.2 52.2c227.6 0 412.3 184.2 412.3 411.4z" fill="${w_color}"/></g><g display="inline" transform="matrix(1.1436805,0,0,1.1436805,154.43816,144.4638)"><g display="inline" stroke="null"><g stroke="null"><path d="m10.5 63.3c0-22.1 17.9-40 40-40h500c22.1 0 40 17.9 40 40v500c0 22.1-17.9 40-40 40h-500c-22.1 0-40-17.9-40-40z" stroke="null"/></g></g><g display="inline" stroke="null"><path d="m42.5 78.6c0-12.9 10.4-23.3 23.3-23.3h466.4c12.9 0 23.3 10.4 23.3 23.3V545c0 12.9-10.4 23.3-23.3 23.3H65.8C52.9 568.3 42.5 557.9 42.5 545ZM299 311.8" stroke="null" fill="#fff"/></g></g><g display="inline" transform="matrix(1.6200143,0,0,1.6200143,-4.8682098,74.244109)"><g stroke="null"><g transform="matrix(9.6803165,0,0,9.6803165,796.11203,-1375.3257)" stroke="null"><path d="m-50.4 156.9c0 0-10.7 0-13.4 0.7-1.4 0.4-2.6 1.6-3 3-0.7 2.7-0.7 8.3-0.7 8.3 0 0 0 5.6 0.7 8.2 0.4 1.5 1.6 2.6 3 3 2.7 0.7 13.4 0.7 13.4 0.7 0 0 10.7 0 13.4-0.7 1.5-0.4 2.6-1.5 3-3 0.7-2.7 0.7-8.2 0.7-8.2 0 0 0-5.6-0.7-8.3-0.4-1.5-1.5-2.6-3-3-2.7-0.7-13.4-0.7-13.4-0.7zm-3.4 6.9 8.9 5.1-8.9 5.1z" stroke="null" fill="#f00"/></g></g></g></svg>`;
    return visJsGraphShape(svg_video);
}

function podcast_icon(w_color) {
    var svg_all = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" version="1.1" width="1000" height="1000">
<style>.s0{fill:#008000;}</style><ellipse cx="502.4" cy="498" rx="463.9" ry="462.9" style="fill:${w_color};stroke-width:12.6"/>
<g transform="matrix(5.3174341,0,0,5.3174341,164.34936,147.86853)"><path stroke="null" stroke-width="null" stroke-opacity="null" d="M67 22.9" style="fill:#3b2f0e;opacity:0.5"/><circle cx="64.1" cy="63.8" r="57.5" style="fill:#fff;stroke-width:8;stroke:#000"/><g stroke="null" display="inline"><path stroke="null" d="m50 60.9h9.1c1.4 0 2.3-0.9 2.3-2.3 0-1.4-0.9-2.3-2.3-2.3h-9.1v-4.5h9.1c1.4 0 2.3-0.9 2.3-2.3 0-1.4-0.9-2.3-2.3-2.3h-9.1v-4.5h9.1c1.4 0 2.3-0.9 2.3-2.3 0-1.4-0.9-2.3-2.3-2.3H50V35.8c0-8.2 6.6-14.7 14.7-14.7 8.2 0 14.7 6.6 14.7 14.7v2.5h-9.1c-1.4 0-2.3 0.9-2.3 2.3 0 1.1 1.1 2.3 2.3 2.3h9.1v4.5h-9.1c-1.4 0-2.3 0.9-2.3 2.3 0 1.1 1.1 2.3 2.3 2.3h9.1v4.5h-9.1c-1.4 0-2.3 0.9-2.3 2.3 0 1.1 1.1 2.3 2.3 2.3h9.1v2.5c0 8.2-6.6 14.7-14.7 14.7-8.2 0-14.7-6.6-14.7-14.7z" fill="#fff"/><path stroke="null" d="m64.8 82.7c10.7 0 19.3-8.6 19.3-19.3V35.8c0-10.7-8.6-19.3-19.3-19.3-10.7 0-19.3 8.6-19.3 19.3v27.7c0 10.7 8.6 19.3 19.3 19.3zM50 60.9h9.1c1.4 0 2.3-0.9 2.3-2.3 0-1.4-0.9-2.3-2.3-2.3h-9.1v-4.5h9.1c1.4 0 2.3-0.9 2.3-2.3 0-1.4-0.9-2.3-2.3-2.3h-9.1v-4.5h9.1c1.4 0 2.3-0.9 2.3-2.3 0-1.4-0.9-2.3-2.3-2.3H50V35.8c0-8.2 6.6-14.7 14.7-14.7 8.2 0 14.7 6.6 14.7 14.7v2.5h-9.1c-1.4 0-2.3 0.9-2.3 2.3 0 1.1 1.1 2.3 2.3 2.3h9.1v4.5h-9.1c-1.4 0-2.3 0.9-2.3 2.3 0 1.1 1.1 2.3 2.3 2.3h9.1v4.5h-9.1c-1.4 0-2.3 0.9-2.3 2.3 0 1.1 1.1 2.3 2.3 2.3h9.1v2.5c0 8.2-6.6 14.7-14.7 14.7-8.2 0-14.7-6.6-14.7-14.7zM93.1 63.2c0-1.1-1.1-2.3-2.3-2.3-1.1 0-2.3 1.1-2.3 2.3 0 13.1-10.7 23.8-23.8 23.8-13.1 0-23.8-10.7-23.8-23.8 0-1.1-1.1-2.3-2.3-2.3-1.1 0-2.3 1.1-2.3 2.3 0 15 11.6 27.2 26.1 28.3v11.1H47.8c-1.1 0-2.3 0.9-2.3 2.3 0 1.4 1.1 2.3 2.3 2.3h34c1.1 0 2.3-0.9 2.3-2.3 0-1.4-1.1-2.3-2.3-2.3H67.1V91.5C81.6 90.4 93.1 78.2 93.1 63.2v0z" fill="#008000"/></g></g></svg>
`;
    return visJsGraphShape(svg_all);
}

function filter_icon(w_color) {
    var svg_filter = `<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" version="1.1">
<circle cx="493.2" cy="507.4" r="465" stroke-miterlimit="4" style="fill:${w_color};stroke-width:16.1"/><g display="inline" transform="matrix(28.498753,0,0,28.498753,20.308239,218.44879)"><rect height="9.4" width="28.9" y="5.5" x="2.2" style="fill:#fff;stroke-width:0.7;stroke:#000001"/><text font-size="8" y="13" x="5" stroke-opacity="null" style="fill:#000;font-family:Helvetica, Arial, sans-serif;font-size:5.5;stroke-width:0.5;text-anchor:start">search</text></g></svg>
`;
    return visJsGraphShape(svg_filter);
}

function arrow_icon(w_color) {
    var svg_all = `<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" height="1000" width="1000">
<metadata>image/svg+xml</metadata><g display="inline" transform="matrix(10.386715,0,0,10.386715,36.654761,30.285746)">
<circle stroke-miterlimit="4" r="44.9" cy="44.9" cx="44.9" style="fill:${w_color};stroke-width:1.9"/><g stroke="null" display="inline"><path d="M75.8 53.1 31.1 15.6v58.3l12-14.4 8.3 17.9 14-6.5-8.3-17.9 18.7 0.1z" stroke="null" style="fill:#fff;stroke-width:0.8"/><path d="M81 54 28.3 9.9V78.5L42.4 61.6 52.2 82.7 68.8 75 58.9 53.9 81 54ZM61.5 72.4 54.9 75.4 43.7 51.5 33.8 63.4V21.6L65.9 48.5 50.3 48.4 61.5 72.4Z" stroke="null" fill="#000"/></g></g></svg>
`;
    return visJsGraphShape(svg_all);
}

function author_icon(hover_color) {
    var svg_author = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" version="1.1">
<g transform="matrix(12.617636,0,0,12.617636,35.826027,36.025732)"><circle cx="37" cy="36.7" r="36.7" fill="${hover_color}"/><path d="M65.3 27.7C65.1 32.5 58.4 41.3 58.4 41.3 53.1 49 55.7 54.9 55.7 54.9 45 57.3 36.2 73 36.2 73 35.8 70.6 30.6 60.8 30.6 60.8 28.5 58.1 24.8 59.1 22.9 59.3 17.3 60 15.9 58.4 15.9 58.4 14.7 57.6 15.2 54.5 15.2 54.5c0.5-1.6-0.3-2.4-0.7-3-1.2-1.7-0.5-2.5-0.5-2.5 0.4-0.5 0.1-0.7 0.1-0.7-1.4-0.4-1.5-1.2-1.5-1.2l0-2.5C12.9 42.8 12.1 42.7 12.1 42.7 9 42.7 9.1 40.7 9.1 40.7 9 39.6 12.7 33 12.7 33 14.5 29.6 12 27.6 11.8 25.9 11 17.9 13.7 13 17.4 9.1 23.5 2.7 31.3 1.5 36.4 1.5c13.1 0.1 18.4 4.2 22.3 8.7 8.3 9.3 6.6 17.4 6.6 17.4z" fill="#000"/><path d="m40.4 52.9c2.3 0 5.1-0.9 7-1.5 0.3-0.4 0.5-0.8 0.8-1.2-1.3-0.4-2.6-1.1-3.2-1.8 1.5 0 3.3-0.4 4.8-0.8 0.4-0.7 0.8-1.4 1.2-2-1.2-0.4-2.3-1-2.9-1.7 1.3 0 2.8-0.3 4.2-0.7 1.7-2.9 7.4-9.6 7.4-9.6-14 4.7-31.7 22.4-36.4 36.4l4.5-2.3c0 0 2.3-5.6 4.6-8 1.7-1.8 6.2-0.4 9.1-1.1 0.7-0.2 2-1.6 3.4-3.6-1.8-0.3-3.7-1.2-4.5-2.1z" fill="#fff"/></g></svg> `;
    return visJsGraphShape(svg_author);
}

function visJsGraphShape(svg_icon) {
    var uri_icon = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg_icon);
    var icon_shape = {
        shape: 'image',
        image: uri_icon
    }
    var icon_json = JSON.stringify(icon_shape);
    return icon_json;
}

function close_icon(w_color) {
    var svg_wikipedia = `<svg viewBox="0 0 340 340"  xmlns="http://www.w3.org/2000/svg">
   <g id="svg_2">
    <path id="svg_3" fill="${w_color}" d="m215.875,169.75l114,114c13,13 13,33 0,46c-6,6 -15,10 -23,10s-17,-4 -23,-10l-114,-114l-114,114c-6,6 -15,10 -23,10s-17,-4 -23,-10c-13,-13 -13,-33 0,-46l114,-114l-114,-114c-13,-13 -13,-33 0,-46s33,-13 46,0l114,114l114,-114c13,-13 33,-13 46,0s13,33 0,46l-114,114z"/>
 </g>
</svg>`;
    return visJsGraphShape(svg_wikipedia);
}

function filter_grow(w_color) {
    var svg_filter = `<svg width="18" height="20" xmlns="http://www.w3.org/2000/svg">
 <g>
  <rect x="-1" y="-1" width="5" height="5.33333" id="canvas_background" fill="none"/>
 </g>
 <g display="inline" id="g15">
  <rect fill="${background_color}" id="svg_5" height="46.50019" width="270.50113" y="-1.03147" x="-0.50067"/>
  <rect stroke="#666666" stroke-width="0.75" fill="#cccccc" id="svg_1" height="12.41678" width="9.87555" y="3.85418" x="3.66673"/>
  <text stroke="#666666" font-family="Helvetica, Arial, sans-serif" text-anchor="start" fill="#000000" stroke-width="0"
   font-size="12px" id="svg_2" y="14.07907" x="5.14378">+</text>
 </g>
</svg>`;
    return visJsGraphShape(svg_filter);
}
function filter_shrink(w_color) {
    var svg_filter = `<svg width="18" height="20" xmlns="http://www.w3.org/2000/svg">
 <g>
  <rect x="-1" y="-1" width="5" height="5.33333" id="canvas_background" fill="none"/>
 </g>
 <g display="inline" id="g15">
  <rect fill="${background_color}" id="svg_5" height="46.50019" width="270.50113" y="-1.03147" x="-0.50067"/>
  <rect stroke="#666666" stroke-width="0.75" fill="#cccccc" id="svg_1" height="12.41678" width="9.87555" y="3.85418" x="3.66673"/>
  <text stroke="#666666" font-family="Helvetica, Arial, sans-serif" text-anchor="start" fill="#000000" stroke-width="0"
   font-size="12px" id="svg_2" y="13.76657" x="6.64377">-</text>
 </g>
</svg>`;
    return visJsGraphShape(svg_filter);
}

function help_icon(w_color) {
    var svg_all = `
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
 <g>
  <rect x="-1" y="-1" width="3.49996" height="3.49996" id="canvas_background" fill="none"/>
 </g>
 <g>
  <circle r="12" cy="12" cx="12" id="svg_circle" fill="${background_color}"/>
  <circle r="8" cy="12" cx="12" id="svg_circle" fill="${w_color}"/>
  <path fill='#A0A0A0' d="m12,2c-5.52,0 -10,4.48 -10,10s4.48,10 10,10s10,-4.48 10,-10s-4.48,-10 -10,-10zm1,17l-2,0l0,-2l2,0l0,2zm2.07,-7.75l-0.9,0.92c-0.72,0.73 -1.17,1.33 -1.17,2.83l-2,0l0,-0.5c0,-1.1 0.45,-2.1 1.17,-2.83l1.24,-1.26c0.37,-0.36 0.59,-0.86 0.59,-1.41c0,-1.1 -0.9,-2 -2,-2s-2,0.9 -2,2l-2,0c0,-2.21 1.79,-4 4,-4s4,1.79 4,4c0,0.88 -0.36,1.68 -0.93,2.25z" id="svg_2"/>
 </g>
</svg>
`;
    return visJsGraphShape(svg_all);
}

module.exports = { db_down_icon,
fit_graph_shape, arrow_icon, zoom_out_shape, zoom_in_shape, close_icon, wikipedia_icon, author_icon, pdf_icon,
    post_icon, book_icon, podcast_icon, rsd_icon, rsd_video, help_icon, google_icon, filter_grow, filter_shrink, filter_icon, arrow_icon
}

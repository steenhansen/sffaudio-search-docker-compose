/* to optimize svgs 
 - change fill:"${fill_in_color}" to fill:"#123456" so can put variable back in 

 - https://petercollingridge.appspot.com/svg-editor/        -- optimize svgs

 https://material.io/tools/icons/?icon=person&style=sharp
 https://www.shareicon.net/
 */

var graph_constants = rootAppRequire('common-node/graph-constants');
var background_color = graph_constants.LIGHT_BACKGROUND;


function htmlDataImage(svg_icon) {
    var uri_icon = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg_icon);
    return uri_icon;
}

function get_fit_icon() {
    var svg_all = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><circle cx="11.8" cy="12.2" r="10.5" 
fill="${background_color}"/>
<g transform="matrix(0.03743491,0,0,0.03743491,-10.296927,-2.7096473)"><g transform="matrix(7.9446675,0,0,7.9446675,396.66417,203.46109)"><polygon points="49.6 28.9 49.6 0 20.6 0 29.1 8.5 8.5 29.1 0 20.6 0 49.5 28.9 49.6 20.5 41.1 41.1 20.5 "/></g><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/>
<g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/></g></svg>
`;
    return htmlDataImage(svg_all);
}

function get_help_icon() {
    var svg_all = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" version="1.1">
<rect x="-1" y="-1" width="3.5" height="3.5" fill="none"/><circle r="8" cy="12" cx="12" fill="#ff0"/>
<path d="M12 2C6.5 2 2 6.5 2 12 2 17.5 6.5 22 12 22 17.5 22 22 17.5 22 12 22 6.5 17.5 2 12 2Zm1 17h-2v-2h2zm2.1-7.7-0.9 0.9C13.5 12.9 13 13.5 13 15h-2v-0.5c0-1.1 0.5-2.1 1.2-2.8l1.2-1.3C13.8 10.1 14 9.6 14 9 14 7.9 13.1 7 12 7 10.9 7 10 7.9 10 9H8c0-2.2 1.8-4 4-4 2.2 0 4 1.8 4 4 0 0.9-0.4 1.7-0.9 2.3z"
 fill="${background_color}"/></svg>
`;
    return htmlDataImage(svg_all);
}

function zoom_out_icon() {
    var svg_wikipedia = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24" y="0" x="0" version="1.1" width="24" height="24"><style>.s0{fill:#010002;}</style>
<circle cx="11.6" cy="12.1" r="10.5" fill="${background_color}"/><g transform="matrix(0.02962201,0,0,0.02962201,4.7873163,4.1436902)"><ellipse cx="304.9" cy="206.8" rx="179.9" ry="183.1" fill="#fff"/>
<path d="m301.9 0c-114.1 0-206.6 92.5-206.6 206.6 0 49.1 17.2 94.1 45.8 129.6L6.5 470.8c-8.6 8.6-8.6 22.6 0 31.2 8.6 8.6 22.6 8.6 31.2 0L172.3 367.4c35.5 28.6 80.5 45.8 129.6 45.8 114.1 0 206.6-92.5 206.6-206.6C508.5 92.5 416 0 301.9 0Zm0 381.4c-96.4 0-174.8-78.4-174.8-174.8 0-96.4 78.4-174.8 174.8-174.8 96.4 0 174.8 78.4 174.8 174.8 0 96.4-78.4 174.8-174.8 174.8zM397.3 190.7h-79.5-31.8-79.5c-8.7 0-15.9 7.1-15.9 15.9 0 8.8 7.2 15.9 15.9 15.9h79.5 31.8 79.5c8.8 0 15.9-7.1 15.9-15.9 0-8.8-7.1-15.9-15.9-15.9z" fill="#010002"/></g></svg>
`;
    return htmlDataImage(svg_wikipedia);
}

function zoom_in_icon() {
    var svg_wikipedia = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24" y="0" x="0" version="1.1" width="24" height="24"><style>.s0{fill:#010002;stroke-width:0;}</style><g transform="translate(129.2705,-613.7345)"><circle cy="625.8" cx="-117.6" r="10.6" 
style="fill:${background_color};stroke-width:0.9"/>
<circle cx="-115.1" cy="623.6" r="6" fill="#fff"/>
<path d="m-115.4 616.9c-3.7 0-6.6 3-6.6 6.6 0 1.6 0.6 3 1.5 4.2l-4.3 4.3c-0.3 0.3-0.3 0.7 0 1 0.3 0.3 0.7 0.3 1 0l4.3-4.3c1.1 0.9 2.6 1.5 4.2 1.5 3.7 0 6.6-3 6.6-6.6 0-3.7-3-6.6-6.6-6.6zm0 12.3c-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6 3.1 0 5.6 2.5 5.6 5.6 0 3.1-2.5 5.6-5.6 5.6zM-112.3 623h-2.6v-2.6c0-0.3-0.2-0.5-0.5-0.5-0.3 0-0.5 0.2-0.5 0.5v2.6h-2.6c-0.3 0-0.5 0.2-0.5 0.5 0 0.3 0.2 0.5 0.5 0.5h2.6v2.6c0 0.3 0.2 0.5 0.5 0.5 0.3 0 0.5-0.2 0.5-0.5v-2.6h2.6c0.3 0 0.5-0.2 0.5-0.5 0-0.3-0.2-0.5-0.5-0.5z" class="s0"/></g></svg>
`;
    return htmlDataImage(svg_wikipedia);
}

function download_mp3_icon(w_color) {
    var svg_wikipedia = `
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="45"><rect x="-1" y="-1" width="37" height="47" fill="#fff"/>
<g display="none"><rect width="100" height="100" x="0" y="0" stroke-width="0" fill="url(#gridpattern)"/></g><metadata>image/svg+xml</metadata><path stroke="null" d="m28.3 6.7c-0.3 0-0.6 0-0.9 0.1 -1.6-3.8-5.5-6.5-9.9-6.5 -4.5 0-8.3 2.7-9.9 6.5 -0.3 0-0.6-0.1-0.9-0.1 -3.6 0-6.5 2.9-6.5 6.4 0 3.5 2.9 6.4 6.5 6.4 0.7 0 1.3-0.1 2-0.3 1.1 1.3 2.7 2.1 4.5 2.4l0-2.2c-1.7-0.3-3.1-1.4-3.8-2.9 -0.7 0.6-1.7 0.9-2.7 0.9 -2.4 0-4.3-1.9-4.3-4.2 0-2.3 1.9-4.2 4.3-4.2 0.9 0 1.6 0.3 2.3 0.7 0.7-4 4.2-7 8.5-7 4.3 0 7.7 3.1 8.4 7.1 0.7-0.4 1.5-0.7 2.3-0.7 2.4 0 4.3 1.9 4.3 4.2 0 2.3-1.9 4.2-4.3 4.2 -0.3 0-0.7 0-1-0.1 -1 1.4-2.6 2.2-4.4 2.2 -0.4 0-0.7-0.1-1.1-0.1l0 2.2c0.4 0.1 0.7 0.1 1.1 0.1 2.1 0 3.9-0.8 5.3-2.1 0 0 0.1 0 0.1 0 3.6 0 6.5-2.9 6.5-6.4 0-3.5-2.9-6.4-6.5-6.4l0 0zm-8.6 6.4l-4.3 0 0 10.6 -4.3 0 6.5 6.4 6.5-6.4 -4.3 0 0-10.6 0 0z" stroke-width="0.6" fill="${w_color}"/><text y="10420" x="15664.5" xml:space="preserve" stroke-width="3.1" fill="${w_color}" font-family="sans-serif" font-size="268.2" font-weight="bold" font-style="normal" transform="matrix(0.05928622696848752,0,0,0.05928622696848752,-927.0531350742086,-574.7849006381877) "><tspan y="10420" x="15664.5" stroke-width="3.1" stroke="null">MP3</tspan></text>
</svg>
`;
    return htmlDataImage(svg_wikipedia);
}

function download_pdf_icon(w_color) {
    var svg_wikipedia = `
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="45">
<rect x="-1" y="-1" width="37" height="47" fill="#fff"/><g display="none"><rect width="100" height="100" x="0" y="0" stroke-width="0" fill="url(#gridpattern)"/></g><metadata>image/svg+xml</metadata><path stroke="null" d="m28.3 6.7c-0.3 0-0.6 0-0.9 0.1 -1.6-3.8-5.5-6.5-9.9-6.5 -4.5 0-8.3 2.7-9.9 6.5 -0.3 0-0.6-0.1-0.9-0.1 -3.6 0-6.5 2.9-6.5 6.4 0 3.5 2.9 6.4 6.5 6.4 0.7 0 1.3-0.1 2-0.3 1.1 1.3 2.7 2.1 4.5 2.4l0-2.2c-1.7-0.3-3.1-1.4-3.8-2.9 -0.7 0.6-1.7 0.9-2.7 0.9 -2.4 0-4.3-1.9-4.3-4.2 0-2.3 1.9-4.2 4.3-4.2 0.9 0 1.6 0.3 2.3 0.7 0.7-4 4.2-7 8.5-7 4.3 0 7.7 3.1 8.4 7.1 0.7-0.4 1.5-0.7 2.3-0.7 2.4 0 4.3 1.9 4.3 4.2 0 2.3-1.9 4.2-4.3 4.2 -0.3 0-0.7 0-1-0.1 -1 1.4-2.6 2.2-4.4 2.2 -0.4 0-0.7-0.1-1.1-0.1l0 2.2c0.4 0.1 0.7 0.1 1.1 0.1 2.1 0 3.9-0.8 5.3-2.1 0 0 0.1 0 0.1 0 3.6 0 6.5-2.9 6.5-6.4 0-3.5-2.9-6.4-6.5-6.4l0 0zm-8.6 6.4l-4.3 0 0 10.6 -4.3 0 6.5 6.4 6.5-6.4 -4.3 0 0-10.6 0 0z" stroke-width="0.6" fill="${w_color}"/><text y="10420" x="15664.5" xml:space="preserve" stroke-width="3.1" fill="${w_color}" font-family="sans-serif" font-size="268.2" font-weight="bold" font-style="normal" transform="matrix(0.05928622696848752,0,0,0.05928622696848752,-927.0531350742086,-574.7849006381877) "><tspan y="10420" x="15664.5" stroke-width="3.1" stroke="null">PDF</tspan></text>
</svg>
`;
    return htmlDataImage(svg_wikipedia);
}

function first_icon(w_color) {
    var svg_wikipedia = `
<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
 <g>
  <rect fill="none" id="canvas_background" height="50" width="50" y="-1" x="-1"/>
 </g>
 <g>
  <path   fill="${w_color}" transform="rotate(-180 24,24) " id="svg_1" d="m12,36l17,-12l-17,-12l0,24zm20,-24l0,24l4,0l0,-24l-4,0z"/>
 </g>
</svg>
`;
    return htmlDataImage(svg_wikipedia);
}

function next_icon(w_color) {
    var svg_wikipedia = `
<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
 <g>
  <rect x="-1" y="-1" width="14" height="14" id="canvas_background" fill="none"/>
 </g>
 <g>
  <path fill="${w_color}" d="m12,36l17,-12l-17,-12l0,24z" id="svg_1"/>
 </g>
</svg>
`;
    return htmlDataImage(svg_wikipedia);
}

function prev_icon(w_color) {
    var svg_wikipedia = `
<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
 <g>
  <rect fill="none" id="canvas_background" height="9.99991" width="9.99991" y="-1" x="-1"/>
 </g>
 <g>
  <path fill="${w_color}" id="svg_1" d="m12,36l17,-12l-17,-12l0,24z" transform="rotate(-180 20.5,24) "/>
 </g>
</svg>
`;
    return htmlDataImage(svg_wikipedia);
}

function last_icon(w_color) {
    var svg_wikipedia = `
<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
 <g>
   <path  fill="${w_color}" d="m12,36l17,-12l-17,-12l0,24zm20,-24l0,24l4,0l0,-24l-4,0z" id="svg_1"/>
 </g>
</svg>
`;
    return htmlDataImage(svg_wikipedia);
}

module.exports = {
    get_fit_icon, get_help_icon, zoom_out_icon, zoom_in_icon, download_mp3_icon,
    download_pdf_icon, first_icon, last_icon, prev_icon, next_icon
}

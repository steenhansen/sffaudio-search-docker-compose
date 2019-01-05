
/* to optimize svgs 
 - change fill:"${fill_in_color}" to fill:"#123456" so can put variable back in 

 - https://petercollingridge.appspot.com/svg-editor/        -- optimize svgs

 https://material.io/tools/icons/?icon=person&style=sharp
 https://www.shareicon.net/
 */
 
 
 var graph_constants = rootAppRequire('sff-network/graph-constants');
var background_color=graph_constants.GRAPH_BACKGROUND;




// svgIcon
function htmlDataImage(svg_icon) {
    var uri_icon = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg_icon);
    return uri_icon;
}



function get_fit_icon(){
var svg_all = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><circle cx="11.8" cy="12.2" r="10.5" fill="#a0a0a0"/>
<g transform="matrix(0.03743491,0,0,0.03743491,-10.296927,-2.7096473)"><g transform="matrix(7.9446675,0,0,7.9446675,396.66417,203.46109)"><polygon points="49.6 28.9 49.6 0 20.6 0 29.1 8.5 8.5 29.1 0 20.6 0 49.5 28.9 49.6 20.5 41.1 41.1 20.5 "/></g><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/><g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/>
<g transform="matrix(11.906878,0,0,11.906878,944.2092,767.91086)"/></g></svg>
`;
    return htmlDataImage(svg_all);
}


function get_help_icon(){
var svg_all = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" version="1.1">
<rect x="-1" y="-1" width="3.5" height="3.5" fill="none"/><circle r="8" cy="12" cx="12" fill="#ff0"/>
<path d="M12 2C6.5 2 2 6.5 2 12 2 17.5 6.5 22 12 22 17.5 22 22 17.5 22 12 22 6.5 17.5 2 12 2Zm1 17h-2v-2h2zm2.1-7.7-0.9 0.9C13.5 12.9 13 13.5 13 15h-2v-0.5c0-1.1 0.5-2.1 1.2-2.8l1.2-1.3C13.8 10.1 14 9.6 14 9 14 7.9 13.1 7 12 7 10.9 7 10 7.9 10 9H8c0-2.2 1.8-4 4-4 2.2 0 4 1.8 4 4 0 0.9-0.4 1.7-0.9 2.3z" fill="#a0a0a0"/></svg>
`;
    return htmlDataImage(svg_all);
}

function zoom_out_icon() {   
    var svg_wikipedia = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24" y="0" x="0" version="1.1" width="24" height="24"><style>.s0{fill:#010002;}</style>
<circle cx="11.6" cy="12.1" r="10.5" fill="#a0a0a0"/><g transform="matrix(0.02962201,0,0,0.02962201,4.7873163,4.1436902)"><ellipse cx="304.9" cy="206.8" rx="179.9" ry="183.1" fill="#fff"/>
<path d="m301.9 0c-114.1 0-206.6 92.5-206.6 206.6 0 49.1 17.2 94.1 45.8 129.6L6.5 470.8c-8.6 8.6-8.6 22.6 0 31.2 8.6 8.6 22.6 8.6 31.2 0L172.3 367.4c35.5 28.6 80.5 45.8 129.6 45.8 114.1 0 206.6-92.5 206.6-206.6C508.5 92.5 416 0 301.9 0Zm0 381.4c-96.4 0-174.8-78.4-174.8-174.8 0-96.4 78.4-174.8 174.8-174.8 96.4 0 174.8 78.4 174.8 174.8 0 96.4-78.4 174.8-174.8 174.8zM397.3 190.7h-79.5-31.8-79.5c-8.7 0-15.9 7.1-15.9 15.9 0 8.8 7.2 15.9 15.9 15.9h79.5 31.8 79.5c8.8 0 15.9-7.1 15.9-15.9 0-8.8-7.1-15.9-15.9-15.9z" fill="#010002"/></g></svg>
`;
     return htmlDataImage(svg_wikipedia);
}


function zoom_in_icon() {   
    var svg_wikipedia = `
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24" y="0" x="0" version="1.1" width="24" height="24"><style>.s0{fill:#010002;stroke-width:0;}</style><g transform="translate(129.2705,-613.7345)"><circle cy="625.8" cx="-117.6" r="10.6" style="fill:#a0a0a0;stroke-width:0.9"/>
<circle cx="-115.1" cy="623.6" r="6" fill="#fff"/>
<path d="m-115.4 616.9c-3.7 0-6.6 3-6.6 6.6 0 1.6 0.6 3 1.5 4.2l-4.3 4.3c-0.3 0.3-0.3 0.7 0 1 0.3 0.3 0.7 0.3 1 0l4.3-4.3c1.1 0.9 2.6 1.5 4.2 1.5 3.7 0 6.6-3 6.6-6.6 0-3.7-3-6.6-6.6-6.6zm0 12.3c-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6 3.1 0 5.6 2.5 5.6 5.6 0 3.1-2.5 5.6-5.6 5.6zM-112.3 623h-2.6v-2.6c0-0.3-0.2-0.5-0.5-0.5-0.3 0-0.5 0.2-0.5 0.5v2.6h-2.6c-0.3 0-0.5 0.2-0.5 0.5 0 0.3 0.2 0.5 0.5 0.5h2.6v2.6c0 0.3 0.2 0.5 0.5 0.5 0.3 0 0.5-0.2 0.5-0.5v-2.6h2.6c0.3 0 0.5-0.2 0.5-0.5 0-0.3-0.2-0.5-0.5-0.5z" class="s0"/></g></svg>
`;
     return htmlDataImage(svg_wikipedia);
}



function download_mp3_icon(w_color) {   
    var svg_wikipedia = `<svg width="35" height="45" xmlns="http://www.w3.org/2000/svg">
 <g>

  <rect x="-1" y="-1" width="37" height="47" id="canvas_background" fill="#fff"/>
  <g id="canvasGrid" display="none">
   <rect id="svg_1" width="100%" height="100%" x="0" y="0" stroke-width="0" fill="url(#gridpattern)"/>
  </g>
 </g>

 <g>

  <metadata id="svg_13">image/svg+xml</metadata>
  <path stroke="null" id="svg_12" d="m28.28892,6.68631c-0.29501,0 -0.57738,0.04666 -0.86396,0.08502c-1.64362,-3.79355 -5.47032,-6.45673 -9.92496,-6.45673c-4.45568,0 -8.27921,2.66317 -9.926,6.45673c-0.28449,-0.03836 -0.56686,-0.08502 -0.86291,-0.08502c-3.57592,0 -6.47335,2.85194 -6.47335,6.37171c0,3.51977 2.89743,6.37171 6.47335,6.37171c0.69221,0 1.3444,-0.14104 1.96813,-0.3443c1.14949,1.25277 2.72882,2.09486 4.50521,2.35206l0,-2.16538c-1.68051,-0.3443 -3.08812,-1.42076 -3.79719,-2.91622c-0.73648,0.5849 -1.65731,0.94995 -2.67616,0.94995c-2.38219,0 -4.31556,-1.90404 -4.31556,-4.2478c0,-2.34479 1.93337,-4.2478 4.31556,-4.2478c0.85236,0 1.63941,0.25095 2.30633,0.66684c0.70593,-3.9927 4.22076,-7.03854 8.48258,-7.03854c4.26499,0 7.7461,3.06038 8.44569,7.06032c0.67431,-0.43142 1.47926,-0.68861 2.34322,-0.68861c2.38115,0 4.31556,1.90302 4.31556,4.2478c0,2.34376 -1.93442,4.2478 -4.31556,4.2478c-0.34558,0 -0.67431,-0.04978 -0.99882,-0.12445c-0.97562,1.35648 -2.5771,2.24835 -4.39564,2.24835c-0.37296,0 -0.72909,-0.05393 -1.07889,-0.13274l0,2.15503c0.35192,0.05602 0.71011,0.10162 1.07889,0.10162c2.06297,0 3.92784,-0.8172 5.29122,-2.13844c0.03581,0.00209 0.06531,0.01453 0.10324,0.01453c3.57592,0 6.47335,-2.85193 6.47335,-6.37171c0,-3.51977 -2.89743,-6.37171 -6.47335,-6.37171l0.00001,0zm-8.63113,6.37171l-4.31556,0l0,10.61951l-4.31556,0l6.47335,6.37171l6.47335,-6.37171l-4.31556,0l0,-10.61951l0,0z" stroke-width="0.64462" fill="${w_color}"/>
  <text id="svg_10" y="10419.96275" x="15664.51857" xml:space="preserve" stroke-width="3.14328" fill="${w_color}" font-family="sans-serif" font-size="268.22678px" font-weight="bold" font-style="normal" transform="matrix(0.05928622696848752,0,0,0.05928622696848752,-927.0531350742086,-574.7849006381877) ">
   <tspan y="10419.96275" x="15664.51857" id="svg_11" stroke-width="3.14328" stroke="null">MP3</tspan>
  </text>
 </g>
</svg>`;
     return htmlDataImage(svg_wikipedia);
}

function download_pdf_icon(w_color) {   
    var svg_wikipedia = `<svg width="35" height="45" xmlns="http://www.w3.org/2000/svg">
 <g>

  <rect x="-1" y="-1" width="37" height="47" id="canvas_background" fill="#fff"/>
  <g id="canvasGrid" display="none">
   <rect id="svg_1" width="100%" height="100%" x="0" y="0" stroke-width="0" fill="url(#gridpattern)"/>
  </g>
 </g>

 <g>
 
  <metadata id="svg_13">image/svg+xml</metadata>
  <path stroke="null" id="svg_12" d="m28.28892,6.68631c-0.29501,0 -0.57738,0.04666 -0.86396,0.08502c-1.64362,-3.79355 -5.47032,-6.45673 -9.92496,-6.45673c-4.45568,0 -8.27921,2.66317 -9.926,6.45673c-0.28449,-0.03836 -0.56686,-0.08502 -0.86291,-0.08502c-3.57592,0 -6.47335,2.85194 -6.47335,6.37171c0,3.51977 2.89743,6.37171 6.47335,6.37171c0.69221,0 1.3444,-0.14104 1.96813,-0.3443c1.14949,1.25277 2.72882,2.09486 4.50521,2.35206l0,-2.16538c-1.68051,-0.3443 -3.08812,-1.42076 -3.79719,-2.91622c-0.73648,0.5849 -1.65731,0.94995 -2.67616,0.94995c-2.38219,0 -4.31556,-1.90404 -4.31556,-4.2478c0,-2.34479 1.93337,-4.2478 4.31556,-4.2478c0.85236,0 1.63941,0.25095 2.30633,0.66684c0.70593,-3.9927 4.22076,-7.03854 8.48258,-7.03854c4.26499,0 7.7461,3.06038 8.44569,7.06032c0.67431,-0.43142 1.47926,-0.68861 2.34322,-0.68861c2.38115,0 4.31556,1.90302 4.31556,4.2478c0,2.34376 -1.93442,4.2478 -4.31556,4.2478c-0.34558,0 -0.67431,-0.04978 -0.99882,-0.12445c-0.97562,1.35648 -2.5771,2.24835 -4.39564,2.24835c-0.37296,0 -0.72909,-0.05393 -1.07889,-0.13274l0,2.15503c0.35192,0.05602 0.71011,0.10162 1.07889,0.10162c2.06297,0 3.92784,-0.8172 5.29122,-2.13844c0.03581,0.00209 0.06531,0.01453 0.10324,0.01453c3.57592,0 6.47335,-2.85193 6.47335,-6.37171c0,-3.51977 -2.89743,-6.37171 -6.47335,-6.37171l0.00001,0zm-8.63113,6.37171l-4.31556,0l0,10.61951l-4.31556,0l6.47335,6.37171l6.47335,-6.37171l-4.31556,0l0,-10.61951l0,0z" stroke-width="0.64462" fill="${w_color}"/>
  <text id="svg_10" y="10419.96275" x="15664.51857" xml:space="preserve" stroke-width="3.14328" fill="${w_color}" font-family="sans-serif" font-size="268.22678px" font-weight="bold" font-style="normal" transform="matrix(0.05928622696848752,0,0,0.05928622696848752,-927.0531350742086,-574.7849006381877) ">
   <tspan y="10419.96275" x="15664.51857" id="svg_11" stroke-width="3.14328" stroke="null">PDF</tspan>
  </text>
 </g>
</svg>`;
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
    var svg_wikipedia = `<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
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
    var svg_wikipedia = `<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
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
    var svg_wikipedia = `<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
 <g>
  <path  fill="${w_color}" d="m12,36l17,-12l-17,-12l0,24zm20,-24l0,24l4,0l0,-24l-4,0z" id="svg_1"/>
 </g>
</svg>
`;
    return htmlDataImage(svg_wikipedia);
}



// these are all dataImages
module.exports = {

get_fit_icon,
get_help_icon,
zoom_out_icon, zoom_in_icon, download_mp3_icon, download_pdf_icon,
first_icon, last_icon, prev_icon, next_icon}

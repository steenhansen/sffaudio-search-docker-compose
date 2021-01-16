 var graph_constants = rootAppRequire('common-node/graph-constants');
 var svg_icons = rootAppRequire('./common-node/html-pages/svg-icons');

let first_page = svg_icons.first_icon(graph_constants.PDF_COLOR);
let last_page = svg_icons.last_icon(graph_constants.PDF_COLOR);
let download_pdf = svg_icons.download_pdf_icon(graph_constants.PDF_COLOR);
let download_rsd_mp3 = svg_icons.download_mp3_icon(graph_constants.RSD_COLOR);
let download_podcast_mp3 = svg_icons.download_mp3_icon(graph_constants.PODCAST_COLOR);
let next_page = svg_icons.next_icon(graph_constants.PDF_COLOR);
let prev_page = svg_icons.prev_icon(graph_constants.PDF_COLOR);

var popup_html = `  
<div id='popup--container'>
    <div id='opaque--cover'></div>
    <div id="media--title">&nbsp;</div>
    <div id="close--enclosure" onclick="sff_js_vars.blur_procs.closePopUp();">
        <img id="close--icon" alt="Smiley face">
    </div>
    <div onclick="sff_js_vars.rsd_procs.downloadMp3();" id="download--rsd--mp3">
        <img src="${download_rsd_mp3}" class="control--symbols">
    </div>
    <div onclick="sff_js_vars.podcast_procs.downloadMp3();" id="download--podcast--mp3">
        <img src="${download_podcast_mp3}" class="control--symbols">
    </div>
    <audio id="mp3--player" controls="controls" title="Right Click, and choose 'Save audio as ...' in context menu">
        Your browser does not support the <code>audio</code> element.
    </audio>
    <div id="post--container">
    </div>
    <div id="video--container">
        <iframe id="video--player" type="text/html" width="640" height="360" frameborder="0"></iframe>
    </div>
    <div id="pdf--controller">
        <div onclick="sff_js_vars.pdf_procs.loadOnePage(1);" class="control--boxes">
            <img id="first--icon" src="${first_page}" class="control--symbols">
        </div>
        <div onclick="sff_js_vars.pdf_procs.loadOnePage('-');" class="control--boxes">
            <img id="first--icon" src="${prev_page}" class="control--symbols">
        </div>
        <div onclick="sff_js_vars.pdf_procs.downloadPdf();" class="control--boxes">
            <img id="download--pdf" src="${download_pdf}" class="control--symbols">
        </div>
        <div onclick="sff_js_vars.pdf_procs.loadOnePage('+');" class="control--boxes">
            <img id="first--icon" src="${next_page}" class="control--symbols">
        </div>
        <div onclick="sff_js_vars.pdf_procs.loadOnePage(0);" class="control--boxes">
            <img id="first--icon" src="${last_page}" class="control--symbols">
        </div>
        <br>
    </div>
    <canvas id='pdf--canvas'></canvas>
</div>
`;



module.exports = { popup_html};


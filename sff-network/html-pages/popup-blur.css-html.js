 var graph_constants = rootAppRequire('sff-network/graph-constants');
 var svg_icons = rootAppRequire('./sff-network/html-pages/svg-icons');

let first_page = svg_icons.first_icon(graph_constants.PDF_COLOR);
let last_page = svg_icons.last_icon(graph_constants.PDF_COLOR);
let download_pdf = svg_icons.download_pdf_icon(graph_constants.PDF_COLOR);
let download_rsd_mp3 = svg_icons.download_mp3_icon(graph_constants.RSD_COLOR);
let download_podcast_mp3 = svg_icons.download_mp3_icon(graph_constants.PODCAST_COLOR);
let next_page = svg_icons.next_icon(graph_constants.PDF_COLOR);
let prev_page = svg_icons.prev_icon(graph_constants.PDF_COLOR);

var popup_html = `  
<div id='popup--container'>
    <div class='opaque--cover'></div>
    <div id="media--title">&nbsp;</div>
    <div id="close--enclosure" onclick="sff_js_vars.blur_procs.closePopUp();">
        <img id="close--icon" src="" alt="Smiley face">
    </div>
    <div onclick="sff_js_vars.rsd_procs.downloadMp3();" id="download--rsd--mp3">
        <img src="${download_rsd_mp3}" class="control--symbols">
    </div>
    <div onclick="sff_js_vars.podcast_procs.downloadMp3();" id="download--podcast--mp3">
        <img src="${download_podcast_mp3}" class="control--symbols">
    </div>
    <audio id="mp3--player" controls="controls" src="" title="Right Click, and choose 'Save audio as ...' in context menu">
        Your browser does not support the <code>audio</code> element.
    </audio>
    <div id="post--container">
    </div>
    <div id="video--container">
        <iframe id="video--player" type="text/html" width="640" height="360" src="" frameborder="0"></iframe>
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

var popup_css = `        
#mp3--player {
    z-index: 3;
    position: absolute;
    display: none;
    padding-top: 32px;
    width: 85%;
}

#post--container {
    text-align: left;
    z-index: 3;
    position: absolute;
    display: none;
    padding-top: 15px;
    background-color: white;
    color: black;
    top: 100px;
    padding-left: 32px;
    width: 100%;
}

#download--rsd--mp3 {
    z-index: 3;
    position: absolute;
    top: 38px;
    left: 8px;
    display: none;
}

#download--podcast--mp3 {
    z-index: 3;
    position: absolute;
    top: 38px;
    left: 8px;
    display: none;
}

#pdf--controller {
    z-index: 3;
    position: absolute;
    display: none;
    text-align: center;
    top: 100px;
    width: 480px;
}

.control--boxes {
    display: inline-block;
    width: 16%;
}

.control--symbols {
    z-index: 333;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
}

#pdf--canvas {
    position: absolute;
    display: block;
    z-index: 333;
    left: -24px;
    width: 100%;
    top: 150px;
}

#media--title {
    position: absolute;
    color: black;
    padding: 8px;
    z-index: 33
}

#close--enclosure {
    z-index: 333;
    left: 0px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    float: right;
}

#close--icon {
    z-index: 333;
    position: relative;
    left: 0px;
    width: 24px;
    height: 24px;
    padding: 4px;
    display: block;
    float: right;
}

#pdf--loading {
    left: 175px;
    position: absolute;
    z-index: 24;
    top: 300px;
    display: none;
}

#popup--container {
    display: none;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: visible;
    text-align: right;
    display: none;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
}

.opaque--cover {
    background-color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    right: -70px;
    left: -70px;
    padding: 70px 70px 210px 70px;
}

#video--container {
    position: absolute;
    top: 100px;
    width: 100%;
    text-align: center;
}
`;

module.exports = {popup_css, popup_html};


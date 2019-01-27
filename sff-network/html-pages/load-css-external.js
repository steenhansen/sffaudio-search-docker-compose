var graph_constants = rootAppRequire('sff-network/graph-constants');
var light_background = graph_constants.LIGHT_BACKGROUND;
var dark_background = graph_constants.DARK_BACKGROUND;
var canvas_height = '400px;';

module.exports =  function (graph_container_id) {
var load_css_external = `
<script>
window.onerror = function (msg, url, lineNo, columnNo, error) {
    var message = [
      'Message: ' + msg,
      'URL: ' + url,
      'Line: ' + lineNo,
      'Column: ' + columnNo,
      'Error object: ' + JSON.stringify(error)
    ].join(' - ');
    console.log(message);
  return false;
};

window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>

<script async src='https://www.google-analytics.com/analytics.js'></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script> 
<link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis-network.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.min.js"></script>


<style>

#stable-redraw-height {
    width: 0%;
    height: ${canvas_height}; /* a var */
    float: left;
}

#my--graph {
    display: flex;
    float: left;
    width: 100%;
    height: ${canvas_height}; /* a var */
}

#${graph_container_id} {
    float: left;
    background-color: ${dark_background}; /* a var */
}

#search--row {
    display: flex;
    background-color: ${light_background}; /* a var */
}
#authors--stories--container {
    background-color: ${light_background}; /* a var */
    border-bottom: 1px solid black;
}




/*
 ::-webkit-scrollbar {
    width: 12px !important;
}
*/

/* Track */
/*
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
    -webkit-border-radius: 10px !important;
    border-radius: 10px !important;
}
*/

/* Handle */
/*
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px !important;
    border-radius: 10px !important;
    background: #41617D !important;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;
}
*/

/*
::-webkit-scrollbar-thumb:window-inactive {
    background: #41617D !important;
}
*/

#all--filter--authors {
    height: 100px;
    overflow-y: scroll;
    overflow-x: hidden;
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
}

#all--filter--books {
    height: 100px;
    overflow-y: scroll;
    overflow-x: hidden;
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    float: right;
    width: 50%;
}

.book__choice, .b__c {
    height: 44px;
    width: 132px;
    float: left;
    color: black;
}

.book__choice:hover, .b__c:hover {
    cursor: pointer;
    color: blue;
}

.book__article, .b__a {
    visibility: hidden;
    text-align: center;
    background-color: yellow;
}

.book__rest, .b__r {
    height: 1em;
    overflow: hidden;
    text-decoration: underline;
}

.author__choice, .a__c {
    color: black;
    height: 32px;
    display: inline-block;
    width: 132px;
}

.author__choice:hover, .a__c:hover {
    cursor: pointer;
    color: blue;
}

.auth__first, .a__f {
    font-size: 75%;
    width: 45%;
    text-align: right;
    display: inline-block;
    vertical-align: middle;
    overflow-x: hidden;
}

.auth__last, .a__l {
    text-decoration: underline;
    font-size: 100%;
    width: 45%;
    text-align: left;
    display: inline-block;
    white-space: nowrap;
    hyphens: none;
}

.auth__mid, .a__m {
    font-size: 70%;
    width: 45%;
    text-align: right;
    display: inline-block;
    visibility: hidden;
}

#reset--center {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#sff--header {
    text-align: center;
    font-size: x-large;
    font-family: Arial, Helvetica, sans-serif;
}

#authors--title {
    width: 50%;
    text-align: center;
    font-size: larger;
}

#books--title {
    width: 50%;
    text-align: center;
    font-size: larger;
}

#do--story--filter {
    flex-grow: 1;
    margin: 4px;
}

#do--author--filter {
    flex-grow: 1;
    margin: 4px;
}

#search--column {
    text-align: center;
    display: inline-block;
    flex-grow: 0;
    width: 155px;
}

#authors--stories--titles {
    display: flex;
    height: 27px
}

#authors--stories--lists {
    float: clear;
}

#all--filter--authors {
    float: left;
    width: 50%;
}

#bottom--icons-row {
    display: flex;
    height: 27px;
    margin-bottom: -27px;
}

#bottom--move--up {
    position: relative;
    width: 100%
}

.bottom--icon {
    position: relative;
    top: -26px;
    width: 13px;
    display: inline-block;
    vertical-align: middle;
    float: left;
    margin-right: 14px;
    padding-top: 1px;
}

body.busy--cursor * {
    cursor: progress;
}

#my--network {
    display: flex;
    flex-direction: column;
    width: 570px;
}

@media only screen
and (min-device-width: 768px)
and (max-device-width: 1024px) {
    #my--network {
        width: 100%;
    }
}

#filter--story--text {
    width: 20%;
}

#filter--author--text {
    width: 140px;
}

.current__media {
    background-color: yellow;
}  

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


</style>

`;
return load_css_external;

}


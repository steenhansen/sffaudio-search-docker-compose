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

<link rel="stylesheet" type="text/css" href="/graph-styles.css">

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

</style>

`;
return load_css_external;

}


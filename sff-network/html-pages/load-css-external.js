

var graph_constants = rootAppRequire('sff-network/graph-constants');
const heroku_url = graph_constants.HEROKU_URL;

module.exports =  function (graph_background, graph_container_id) {

var canvas_height = '400px;';

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
</script>


<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script> 


<link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis-network.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.min.js"></script>




   <style>
        body {
          /*  color: #d3d3d3;  */
         /*   font: 12pt arial;  */
            background-color: #eeffee;
        }
        
body.busy--cursor * {
    cursor: progress;
}
        

        
        #my--network {
            display: flex;
            flex-direction: column;
            width: 570px;
            height: 800px;
        }
        
        @media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px)  { 
    #my--network {
        width: 100%;
    }
}  
     
     #stable-redraw-height{
     width: 0%;
     height:${canvas_height};
     float: left;
     }
     
     #my--graph{
        display: flex;
        float: left;
        width:100%;
        height:${canvas_height};
        
     }
     
         #${graph_container_id} {
            
            float: left;
             background-color: ${graph_background};
                  
        }

        #do--story--filter{
             /*  width: 20%;   */
        }      

        #clear--story--filter{
             /*  width: 20%;   */
        }      
        
        #filter--story--text {
             width: 20%;
        }
        
        #filter--author--text {
             width: 140px;
        }
        
           .current__media{
            background-color: yellow; 
    }
        
    </style>

`;
return load_css_external;

}


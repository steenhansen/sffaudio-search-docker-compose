

var graph_constants = rootAppRequire('sff-network/graph-constants');
const heroku_url = graph_constants.HEROKU_URL;

const vis_no_hover_edges_js = heroku_url + "vis_no_hover_edges.js"
module.exports =  function (graph_background, graph_container_id) {

var canvas_height = '400px;';

var load_css_external = `


<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script> -->


<script src="${vis_no_hover_edges_js}"></script>



<link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis-network.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.min.js"></script>

   <style>
        body {
          /*  color: #d3d3d3;  */
         /*   font: 12pt arial;  */
            background-color: #eeffee;
        }
        #my--network {
            display: flex;
            flex-direction: column;
            width: 570px;
            height: 800px;
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
             width: 70px;
        }
        
           .current__media{
            background-color: yellow; 
    }
        
    </style>

`;
return load_css_external;

}


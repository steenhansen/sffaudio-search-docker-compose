
module.exports =  function (graph_background, graph_container_id) {

var canvas_height = '400px;';

var load_css_external = `
<script src="/vis_no_hover_edges.js"></script>

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
        #clear--filter{
               width: 20%;
        }      
        
        #filter--text {
             width: 60%;
        }
        
           .current__media{
            background-color: yellow; 
    }
        
    </style>

`;
return load_css_external;

}


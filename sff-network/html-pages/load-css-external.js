
module.exports =  function (graph_background) {

var load_css_external = `

<script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis-network.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.min.js"></script>

   <style>
        body {
            color: #d3d3d3;
            font: 12pt arial;
            background-color: #eeffee;
        }
        #mynetwork {
            width: 1000px;
            height: 600px;
        }
     
         #my-graph_ {
             width: 600px;
            float: left;
             background-color: ${graph_background};
                  height: 600px;
        }
        #clear--filter{
               width: 20%;
        }      
        
        #filter--text {
             width: 70%;
        }
        
           .current__media{
            background-color: yellow; 
    }
        
    </style>

`;
return load_css_external;

}


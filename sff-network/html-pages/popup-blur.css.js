//HoverIcon = rootAppRequire('sff-network/show-nodes/media-nodes/hover-icon')
 var graph_constants = rootAppRequire('sff-network/graph-constants');
 var svg_icons = rootAppRequire('./sff-network/html-pages/svg-icons');
//var graph_icons = rootAppRequire('./sff-network/html-pages/graph-icons');

var popup_blur_js = `
//popup-blur.css.js
sff_vars.blur_procs = (function (pop_up_id) {

    var my = {};

    my.keyDowns = function (event) {
        var key_code = event.keyCode;
        if (key_code == 27) {
            sff_vars.blur_procs.closePopUp();
        } else if (key_code == 37) {
            sff_vars.pdf_procs.loadOnePage('-');
        } else if (key_code == 39) {
            sff_vars.pdf_procs.loadOnePage('+');
        }
    };

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return '';
    }

    my.closePopUp = function () {
        var under_title = getQueryVariable('book');
        var strip_author = getQueryVariable('author');
        if (under_title) {
            sff_vars.history_state.replaceBook(strip_author, under_title);
        } else {
            sff_vars.history_state.replaceAuthor(strip_author);
        }
        if (window.location.search == '') {
            window.history.forward();
        }
        sff_vars.helpers.setDisplay(pop_up_id, 'none');
        sff_vars.helpers.setDisplay('media--title', 'none');
        sff_vars.helpers.setDisplay('mp3--player', 'none');
        sff_vars.helpers.setDisplay('post--container', 'none');
        document.getElementById('post--container').innerHTML = '';
        sff_vars.helpers.setDisplay('pdf--controller', 'none');
        sff_vars.helpers.setDisplay('pdf--canvas', 'none');
        sff_vars.pdf_procs.clearCanvas('pdf--canvas');
        sff_vars.helpers.setDisplay('pdf--loading', 'none');
        sff_vars.helpers.setDisplay('video--container', 'none');
        
        sff_vars.helpers.setDisplay('download--rsd--mp3', 'none');
        sff_vars.helpers.setDisplay('download--podcast--mp3', 'none');
        document.getElementById('video--player').src = '';
        document.getElementById("my--graph").style.display="block"; 
    }

    my.postPdfWidth = function (post_pdf_container) {
        sff_vars.helpers.setDisplay(post_pdf_container, 'block');
        var post_container = document.getElementById(post_pdf_container);
        var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        post_container.style.left = screen_width * 0.05 + "px";
        post_container.style.width = screen_width * 0.9 + "px";
    }

    my.mp3load = function (goto_url) {
        var mp3_player = document.getElementById("mp3--player");
        sff_vars.helpers.setDisplay("mp3--player", 'block');
        mp3_player.src = goto_url;
        mp3_player.load();
        var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var canvas_left_px = screen_width * 0.05;
        mp3_player.style.left = canvas_left_px + "px";
        mp3_player.style.width = screen_width * 0.9 + "px";
    }

    my.screenHeightPx = function () {
        var screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientheight;
        return screen_height + 'px';
    }

    my.blockPage = function (container_id) {
        var screen_height_px = my.screenHeightPx();
        document.getElementById(container_id).style.height = screen_height_px;
        document.getElementById(container_id).style.width = window.screen.width + 'px';
        var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        document.getElementById('close--icon').style.left = (screen_width * 0.9) + 'px';
        sff_vars.helpers.setDisplay(container_id, 'block');
        sff_vars.helpers.setDisplay('close--icon', 'block');
    }

    return my;

}('popup--container')); 
//popup-blur.css.js end 
`;

let first_page = svg_icons.first_icon(graph_constants.PDF_COLOR);
let last_page = svg_icons.last_icon(graph_constants.PDF_COLOR);


let download_pdf = svg_icons.download_pdf_icon(graph_constants.PDF_COLOR);
let download_rsd_mp3 = svg_icons.download_mp3_icon(graph_constants.RSD_COLOR);
let download_podcast_mp3 = svg_icons.download_mp3_icon(graph_constants.PODCAST_COLOR);

let next_page = svg_icons.next_icon(graph_constants.PDF_COLOR);
let prev_page = svg_icons.prev_icon(graph_constants.PDF_COLOR);



var popup_blur_html = `  
   <div id='popup--container'>
    <div class='opaque--cover' ></div>
    


    <div id="close--enclosure" onclick="sff_vars.blur_procs.closePopUp();">
        <img id="close--icon" src="" alt="Smiley face">
    </div>

    <div id="media--title">&nbsp;</div>
    
    

 <div  onclick="sff_vars.rsd_procs.downloadMp3();"  id="download--rsd--mp3"  >
        <img src="${download_rsd_mp3}" class="control--symbols">
  </div>
  
 <div  onclick="sff_vars.podcast_procs.downloadMp3();"  id="download--podcast--mp3"  >
        <img src="${download_podcast_mp3}" class="control--symbols">
  </div>
  

    <audio id="mp3--player" controls="controls"
           style="  "
           src="" title="Right Click, and choose 'Save audio as ...' in context menu">
        Your browser does not support the <code>audio</code> element.
    </audio>


    <div id="post--container"
         style="  ">
    </div>

   <div id="video--container" style=" "> 
         <iframe id="video--player" type="text/html" width="640" height="360" src=""
  frameborder="0"></iframe>
  
    </div>

<div id="pdf--controller" >

    <div  onclick="sff_vars.pdf_procs.loadOnePage(1);" class="control--boxes" >
        <img id="first--icon" src="${first_page}"  class="control--symbols">
    </div>

    <div  onclick="sff_vars.pdf_procs.loadOnePage('-');" class="control--boxes" >
        <img id="first--icon"  src="${prev_page}" class="control--symbols">
  </div>


  <div  onclick="sff_vars.pdf_procs.downloadPdf();" class="control--boxes" >
        <img id="download--pdf"  src="${download_pdf}" class="control--symbols">
  </div>




    <div  onclick="sff_vars.pdf_procs.loadOnePage('+');" class="control--boxes">
        <img id="first--icon" src="${next_page}"  class="control--symbols">
  </div>

    <div  onclick="sff_vars.pdf_procs.loadOnePage(0);" class="control--boxes" >
        <img id="first--icon"  src="${last_page}" class="control--symbols">
          </div>
          
               <br>
            
             
</div>

 <canvas id='pdf--canvas'></canvas>
    

</div>


<img id='pdf--loading' src='/gifer_com_loader.gif' >
         
         
    `;

// sff_vars.graph_vars.node_icons.I_CLOSE_PDF.image




// css classes, and ids ===  my--class,  my__id
var popup_blur_css = `        



#mp3--player{
z-index:3; 
 position:absolute; 
  display:none; 
   padding-top:32px; 
   width:100%;
}


#post--container{
text-align:left;
 z-index:3; 
  position:absolute; 
   display:none;  
   padding-top:15px;
    background-color:white; 
    color:black;
 top:100px;
}

#download--rsd--mp3{
  z-index:3; 
 position:absolute; 
top:38px;
left:8px;
  display:none; 
}

#download--podcast--mp3{
  z-index:3; 
 position:absolute; 
top:38px;
left:8px;
  display:none; 
}



#pdf--controller{
z-index:3; 
 position:absolute; 
  display:none; 
   text-align:center;
    top:100px;
}


.control--boxes{
display:inline-block;
 width:3%;
 vertical-align: middle;
 float: right;
 margin-right:14px;
 padding-top:1px;
}

.control--symbols{
z-index:333;  
 cursor:pointer; 
 margin-left:auto;
  margin-right: auto;
}


#pdf--canvas{
position:absolute;
 display:block;
  z-index:333; 
  left:-24px;
}

#pdf--loading{
left:50%; 
margin-left:-105px
}







#media--title{
position:absolute;
 color:black; 
 padding:8px; 
 z-index:33
}

#close--enclosure{
 z-index:333;
 position:absolute; 
 left:0px; 
 width:24px; 
 height:24px; 
 cursor:pointer;
}

#close--icon{
z-index:333; 
position:absolute; 
left:0px; 
width:100%; 
height:100%; 
padding:4px

}

#pdf--loading{
    position:absolute; 
    z-index:4;
    top:200px;
    display:none;
}


#popup--container {
display:none;
  width: 100%;
  height: 1000px;
  position: relative;
  overflow: hidden;
  
text-align:right;  
display:none; 
z-index:1; 
     position:absolute; 
     top:0; 
     left:0; 
     min-height:100%;
}

.opaque--cover {
background-color:white;
  position: absolute;
  width: 100%;
  height: 100%; 
  right: -70px;
  left: -70px;
  padding:70px 70px 210px 70px;
}

        
#video--container{
  position:absolute; 
  top:100px;
   width:100%; 
   text-align:center;
}
    `;

//pop_up_js_html_css =  popup_blur_css+  popup_blur_html + popup_blur_js ;


//module.exports = pop_up_js_html_css;


module.exports = {popup_blur_css, popup_blur_html, popup_blur_js};


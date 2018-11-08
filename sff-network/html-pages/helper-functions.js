
var sff_helpers_js = `
      <script>
             sff_vars.helpers = (function () {
            
                var my = {};
                
     my.setDisplay = function (elem_id,display_value) {
         document.getElementById(elem_id).style.display=display_value;
  };      
  
  
  
  
  
                  
     my.setDisplayNone = function (elem_id) {
         document.getElementById(elem_id).style.display='none';
  };      
  
                  
     my.setDisplayBlock = function (elem_id) {
         document.getElementById(elem_id).style.display='block';
  };      
  
  
  
  
          my.setHeight = function (elem_id,height_integer) {
         document.getElementById(elem_id).style.height=height_integer+'px';
  };      
          
          
          
   my.setHeight38 = function (elem_id) {
         document.getElementById(elem_id).style.height='38px';
  };         
   my.setHeight16 = function (elem_id) {
         document.getElementById(elem_id).style.height='16px';
  };         
          
          
          
          
          


                 my.setVisible = function (elem_id) {
         document.getElementById(elem_id).style.visibility='visible';
  };      

                 my.setHidden = function (elem_id) {
         document.getElementById(elem_id).style.visibility='hidden';
  };      


           
                return my;
            
            }()); 
        
     </script>
    `;

  //const popup_post = rootAppRequire('sff-network/html-pages/helper-functions');


module.exports = sff_helpers_js;

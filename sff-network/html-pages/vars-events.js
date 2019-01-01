var sff_vars_events = `
// vars-events
 
window.sff_vars={};

sff_vars.vars_events = (function () {

    var my = {};

    my.initVars = function () {
           try {
                var ajax_url =  window.sff_php_vars.php_url;
           } catch(err) {
                window.sff_php_vars={ 'php_url':'not a php host'};
                var ajax_url =  window.location.origin;
           }
           sff_vars.ajax_url=ajax_url;
           sff_vars.path_name = window.location.pathname;
    };

 my.resizeFunc = function (){
}

    my.initEvents = function () {
        window.onpopstate =sff_vars.history_state.onPopState;
        window.onkeydown = function( event ) {
            sff_vars.blur_procs.keyDowns(event)
        };
        window.addEventListener('resize',  my.resizeFunc)
        
        
    };

    return my;

}()); 
// vars-events end
`;
module.exports = sff_vars_events;

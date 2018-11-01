
module.exports =  function (server_var) {

var load_css_external = `

 window.sff_rsd_procs = (function (rsd_close_svg) {

    var my = {
        my_var: ${server_var}
    };

    my.loadRsd = function (goto_url, rsd_description, label, rsd_pdf_link) {

        sff_helpers.setDisplay('media--title', 'block');
        sff_pdf_procs.loadPdf(rsd_pdf_link, label, rsd_description);
         document.getElementById('close--icon').src = rsd_close_svg; 
        sff_blur_procs.blockPage('popup--container');

         sff_helpers.setDisplay('post--container', 'none');
        sff_blur_procs.mp3load(goto_url);
    }

    return my;

}(sff_graph_vars.node_icons.I_CLOSE_RSD.image)) 

`;
return load_css_external;

}


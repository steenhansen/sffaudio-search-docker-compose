var js_loader = rootAppRequire('sff-network/html-pages/jsloader-css')

const {MOBILE_HEADER_ABOVE} = rootAppRequire('sff-network/graph-constants');



module.exports = function build_page(nodes_object, edges_object, graph_object, req_query_view, req_query_choice, nodes_and_edges_str) {
                    return js_loader(nodes_object, edges_object, graph_object, req_query_view, req_query_choice, nodes_and_edges_str)
        .then(widget_html=> {
            return `<!DOCTYPE html>
<link rel="shortcut icon" href="https://nyc3.digitaloceanspaces.com/sffaudio-usa/graph-search/favicon.ico"  type="image/x-icon" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width, user-scalable=no" />
<style>
button {
  /* -webkit-appearance: none; */
}
</style>
${MOBILE_HEADER_ABOVE}
<!-- start widget -->
    ${widget_html}
<!-- end widget -->
`;
        });
}



var help_font = ' "font": {"size": 16, "color": "yellow" } ';
var error_font = ' "font": {"size": 16, "color": "red" } ';

var sff_help_graph = `
<script>
// help-graph

sff_vars.NO_SUCH_AUTHOR=[{"group":"I_NOTHING", ${error_font},
            "title" : "click on an author above",
            "label":"Author is not in the database"}];

sff_vars.NO_SUCH_BOOK=[{"group":"I_NOTHING", ${error_font},
             "title" : "click on a story below",
             "label":"Story is not in the database"}];

sff_vars.help_nodes= {
"HELP_ALL" : [ {"id": 900, "group":"I_HELP", "node_type":"I_HELP", ${help_font}, "label":"Help" },
               {"id": 901, "group":"N_AUTHOR", "node_type":"HELP_AUTHOR", "title":"Click for author help"},
               {"id": 902, "group":"N_BOOK", "node_type":"HELP_BOOK", "title":"Click for book help"},
               {"id": 903, "group":"N_PDF", "node_type":"HELP_PDF", "title":"Click for pdf help"},
               {"id": 904, "group":"N_AUTHOR_POST", "node_type":"HELP_AUTHOR_POST", "title":"Click for author post help"},
               {"id": 905, "group":"N_RSD", "node_type":"HELP_RSD", "title":"Click for RSD help"},
               {"id": 906, "group":"N_PODCAST", "node_type":"HELP_PODCAST", "title":"Click for podcast help"},
               {"id": 907, "group":"N_BOOK_WIKI", "node_type":"HELP_BOOK_WIKI", "title":"Click for Wikipedia help"},
               {"id": 908, "group":"N_ZOOM_IN", "node_type":"HELP_ZOOM_IN", "title":"Click for zoom in help"},         
               {"id": 909, "group":"N_FILTER", "node_type":"HELP_FILTER", "title":"Click for filter help"},
               {"id": 910, "group":"N_ZOOM_OUT", "node_type":"HELP_ZOOM_OUT", "title":"Click for zoom out help"},
               {"id": 911, "group":"N_ARROW", "node_type":"HELP_ARROW", "title":"Click for drag help"}          ],
                        
"HELP_AUTHOR":[ {"group":"N_AUTHOR", "node_type":"HELP_AUTHOR", ${help_font},
                 "label":"View stories, posts & Wikipedia" + "\\n" +
                         "entries of authors." }],
            
"HELP_BOOK":[ {"group":"N_BOOK", "node_type":"HELP_BOOK", ${help_font},
               "label":"View podcasts, posts, RSDs," + "\\n" +
                       "pdfs & Wikipedia" + "\\n" +
                       "entries of stories." }],
            
"HELP_PDF":[ {"group":"N_PDF", "node_type":"HELP_PDF", ${help_font},
              "label":"View or download story pdfs" }],   
            
"HELP_AUTHOR_POST":[ {"group":"N_AUTHOR_POST", "node_type":"HELP_AUTHOR_POST", ${help_font},
                      "label":"View a story or author post" }],   
            
"HELP_RSD":[ {"group":"N_RSD", "node_type":"HELP_RSD", ${help_font},
              "label":"Listen to an RSD podcast and" + "\\n" +
                      "read the accompanying pdf" }],            
            
"HELP_PODCAST":[ {"group":"N_PODCAST", "node_type":"HELP_PODCAST", ${help_font},
              "label":"Listen to an SFF-Audio podcast and" + "\\n" +
                      "read the accompanying show notes" }],                  
            
            
"HELP_BOOK_WIKI":[ {"group":"N_BOOK_WIKI", "node_type":"HELP_BOOK_WIKI", ${help_font},
              "label":"Read the Wikipedia entry" + "\\n" +
                      "of an author or storey" }],              
            
"HELP_ZOOM_IN":[ {"group":"N_ZOOM_IN", "node_type":"HELP_ZOOM_IN", ${help_font},
                 "label":"Grow graph; same as" + "\\n" +
                         "using the mouse scroll wheel" }],
            
            
            
            
            
"HELP_ZOOM_OUT":[ {"group":"N_ZOOM_OUT", "node_type":"HELP_ZOOM_OUT", ${help_font},
                 "label":"Shrink graph; same as" + "\\n" +
                         "using the mouse scroll wheel" }],
                    
"HELP_FILTER":[ {"group":"N_FILTER", "node_type":"HELP_FILTER", ${help_font},
                 "label":"Filter authors & books."     + "\\n" +
                         "Entering 'moore' will result"  + "\\n" +
                         "authors named 'moore' and"    + "\\n" +
                         "stories written by someone"  + "\\n" +
                         "named 'moore' being shown." }],
                                          
"HELP_ARROW":[ {"group":"N_ARROW", "node_type":"HELP_ARROW", ${help_font},
                 "label":"Drag graph with mouse" }]                         
            
            };


sff_vars.HELP_ALL_EDGES= [
              {"from": 900,"to": 901 },
              {"from": 900,"to": 902 },
              {"from": 900,"to": 903 },
              {"from": 900,"to": 904 },
              {"from": 900,"to": 905 },
              {"from": 900,"to": 906 },
              {"from": 900,"to": 907 },
              {"from": 900,"to": 908 },
              {"from": 900,"to": 909 },
              {"from": 900,"to": 910 },
              {"from": 900,"to": 911 },
              ];
// help-graph end
</script>
`;
module.exports = sff_help_graph;

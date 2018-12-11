
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
"HELP_ALL" : [ {"id": 900, "group":"I_HELP", "node_type":"HELP_ALL", ${help_font}, "label":"Help" },
               {"id": 901, "group":"L_AUTHOR", "node_type":"HELP_AUTHOR"},
               {"id": 902, "group":"L_BOOK", "node_type":"HELP_BOOK"},
               {"id": 903, "group":"L_PDF", "node_type":"HELP_PDF"},
               {"id": 904, "group":"L_AUTHOR_POST", "node_type":"HELP_AUTHOR_POST"},
               {"id": 905, "group":"L_RSD", "node_type":"HELP_RSD"},
               {"id": 906, "group":"L_PODCAST", "node_type":"HELP_PODCAST"},
               {"id": 907, "group":"L_BOOK_WIKI", "node_type":"HELP_BOOK_WIKI"},
               {"id": 908, "group":"I_GROW", "node_type":"HELP_GROW"},         
               {"id": 909, "group":"I_FILTER", "node_type":"HELP_FILTER"},
               {"id": 910, "group":"I_SHRINK", "node_type":"HELP_SHRINK"},
               {"id": 911, "group":"I_ARROW", "node_type":"HELP_ARROW"}  ],
                        
"HELP_AUTHOR":[ {"group":"L_AUTHOR", "node_type":"HELP_AUTHOR", ${help_font},
                 "label":"View stories, posts & Wikipedia" + "\\n" +
                         "entries of authors." }],
            
"HELP_BOOK":[ {"group":"L_BOOK", "node_type":"HELP_BOOK", ${help_font},
               "label":"View podcasts, posts, RSDs," + "\\n" +
                       "pdfs & Wikipedia" + "\\n" +
                       "entries of stories." }],
            
"HELP_PDF":[ {"group":"L_PDF", "node_type":"HELP_PDF", ${help_font},
              "label":"View or download story pdfs" }],   
            
"HELP_AUTHOR_POST":[ {"group":"L_AUTHOR_POST", "node_type":"HELP_AUTHOR_POST", ${help_font},
                      "label":"View a story or author post" }],   
            
"HELP_RSD":[ {"group":"L_RSD", "node_type":"HELP_RSD", ${help_font},
              "label":"Listen to an RSD podcast and" + "\\n" +
                      "read the accompanying pdf" }],            
            
"HELP_PODCAST":[ {"group":"L_PODCAST", "node_type":"HELP_PODCAST", ${help_font},
              "label":"Listen to an SFF-Audio podcast and" + "\\n" +
                      "read the accompanying show notes" }],                  
            
            
"HELP_BOOK_WIKI":[ {"group":"L_BOOK_WIKI", "node_type":"HELP_BOOK_WIKI", ${help_font},
              "label":"Read the Wikipedia entry" + "\\n" +
                      "of an author or storey" }],              
            
"HELP_GROW":[ {"group":"I_GROW", "node_type":"HELP_GROW", ${help_font},
                 "label":"Grow graph; same as" + "\\n" +
                         "using the mouse scroll wheel" }],
            
            
            
            
            
"HELP_SHRINK":[ {"group":"I_SHRINK", "node_type":"HELP_SHRINK", ${help_font},
                 "label":"Shrink graph; same as" + "\\n" +
                         "using the mouse scroll wheel" }],
                    
"HELP_FILTER":[ {"group":"I_FILTER", "node_type":"HELP_FILTER", ${help_font},
                 "label":"Filter authors & books."     + "\\n" +
                         "Entering 'moore' will result"  + "\\n" +
                         "authors named 'moore' and"    + "\\n" +
                         "stories written by someone"  + "\\n" +
                         "named 'moore' being shown." }],
                                          
"HELP_ARROW":[ {"group":"I_ARROW", "node_type":"HELP_ARROW", ${help_font},
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

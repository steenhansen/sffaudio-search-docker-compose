// help-graph

sff_js_vars.NO_SUCH_AUTHOR = [{
    "id": 800,
    "group": "N_GOOGLE",
    "font": sff_constants.ERROR_FONT,
    "title": "Click to search for text on Google",
    "goto_url": "_http://www.google.com_",
    "node_type": "G_GOOGLE",
    "label": "_Author is not in the database_"
}];

sff_js_vars.NO_SUCH_BOOK = [{
    "id": 801,
    "group": "N_GOOGLE",
    "font": sff_constants.ERROR_FONT,
    "title": "Click to search for text on Google",
    "goto_url": "_http://www.google.com_",
    "node_type": "G_GOOGLE",
    "label": "_Story is not in the database_"
}];

sff_js_vars.help_nodes = {
    "HELP_ALL": [{
        "id": 900,
        "group": "I_HELP",
        "node_type": "I_HELP",
        "font": sff_constants.HELP_FONT,
        "label": "Help"
    },
        {"id": 901, "group": "N_AUTHOR", "node_type": "HELP_AUTHOR", "title": "Click for author help"},
        {"id": 902, "group": "N_BOOK", "node_type": "HELP_BOOK", "title": "Click for book help"},
        {"id": 903, "group": "N_PDF", "node_type": "HELP_PDF", "title": "Click for PDF help"},
        {"id": 904, "group": "N_AUTHOR_POST", "node_type": "HELP_AUTHOR_POST", "title": "Click for author post help"},
        {"id": 905, "group": "N_RSD", "node_type": "HELP_RSD", "title": "Click for RSD help"},
        {"id": 906, "group": "N_PODCAST", "node_type": "HELP_PODCAST", "title": "Click for podcast help"},
        {"id": 907, "group": "N_BOOK_WIKI", "node_type": "HELP_BOOK_WIKI", "title": "Click for Wikipedia help"},
        {"id": 908, "group": "N_ZOOM_IN", "node_type": "HELP_ZOOM_IN", "title": "Click for zoom in help"},
        {"id": 909, "group": "N_FILTER", "node_type": "HELP_FILTER", "title": "Click for filter help"},
        {"id": 910, "group": "N_ZOOM_OUT", "node_type": "HELP_ZOOM_OUT", "title": "Click for zoom out help"},
        {"id": 911, "group": "N_ARROW", "node_type": "HELP_ARROW", "title": "Click for drag help"},
        {"id": 912, "group": "N_FIT", "node_type": "HELP_FIT", "title": "Click for resize help"},
        {"id": 913, "group": "N_GOOGLE", "node_type": "HELP_GOOGLE", "title": "Click for Google help"},
        {"id": 914, "group": "N_DB_DOWN", "node_type": "HELP_DB_DOWN", "title": "Click for DB Down help"}],

    "HELP_AUTHOR": [{
        "group": "N_AUTHOR", "node_type": "HELP_AUTHOR",
        "font": sff_constants.HELP_FONT,
        "label": "View stories, posts & Wikipedia" + "\n" +
        "entries of authors."
    }],

    "HELP_BOOK": [{
        "group": "N_BOOK", "node_type": "HELP_BOOK",
        "font": sff_constants.HELP_FONT,
        "label": "View podcasts, posts, RSDs," + "\n" +
        "PDFs & Wikipedia" + "\n" +
        "entries of stories."
    }],

    "HELP_PDF": [{
        "group": "N_PDF", "node_type": "HELP_PDF",
        "font": sff_constants.HELP_FONT,
        "label": "View or download story PDFs"
    }],

    "HELP_AUTHOR_POST": [{
        "group": "N_AUTHOR_POST", "node_type": "HELP_AUTHOR_POST",
        "font": sff_constants.HELP_FONT,
        "label": "View a story or author post"
    }],

    "HELP_RSD": [{
        "group": "N_RSD", "node_type": "HELP_RSD",
        "font": sff_constants.HELP_FONT,
        "label": "Listen to an RSD podcast &" + "\n" +
        "read the accompanying PDF"
    }],

    "HELP_PODCAST": [{
        "group": "N_PODCAST", "node_type": "HELP_PODCAST",
        "font": sff_constants.HELP_FONT,
        "label": "Listen to an SFFaudio podcast &" + "\n" +
        "read the accompanying show notes"
    }],

    "HELP_BOOK_WIKI": [{
        "group": "N_BOOK_WIKI", "node_type": "HELP_BOOK_WIKI",
        "font": sff_constants.HELP_FONT,
        "label": "Read the Wikipedia entry" + "\n" +
        "of an author or storey"
    }],

    "HELP_ZOOM_IN": [{
        "group": "N_ZOOM_IN", "node_type": "HELP_ZOOM_IN",
        "font": sff_constants.HELP_FONT,
        "label": "Grow graph; same as" + "\n" +
        "using the mouse scroll wheel"
    }],

    "HELP_ZOOM_OUT": [{
        "group": "N_ZOOM_OUT", "node_type": "HELP_ZOOM_OUT",
        "font": sff_constants.HELP_FONT,
        "label": "Shrink graph; same as" + "\n" +
        "using the mouse scroll wheel"
    }],

    "HELP_FILTER": [{
        "group": "N_FILTER", "node_type": "HELP_FILTER",
        "font": sff_constants.HELP_FONT,
        "label": "Filter authors & books." + "\n" +
                 "Entering 'dick' will result in" + "\n" +
                 "authors named 'Dick' & story" + "\n" +
                 "titles containing 'dick'. For" + "\n" +
                 "instance the book 'Moby Dick'"+ "\n" +
                 "and the author'Philip K Dick'."
    }],

    "HELP_ARROW": [{
        "group": "N_ARROW", "node_type": "HELP_ARROW",
        "font": sff_constants.HELP_FONT,
        "label": "Drag graph with mouse"
    }],

    "HELP_FIT": [{
        "group": "N_FIT", "node_type": "HELP_FIT",
        "font": sff_constants.HELP_FONT,
        "label": "Click to resize graph"
    }],

    "HELP_GOOGLE": [{
        "group": "N_GOOGLE", "node_type": "HELP_GOOGLE",
        "font": sff_constants.HELP_FONT,
        "label": "Use Google's text search"
    }],
    
      "HELP_DB_DOWN": [{
        "group": "N_DB_DOWN", "node_type": "HELP_DB_DOWN",
        "font": sff_constants.HELP_FONT,
        "label": "Database is updating, try again in a couple of minutes"
    }]
};

sff_js_vars.HELP_ALL_EDGES = [
    {"from": 900, "to": 901},
    {"from": 900, "to": 902},
    {"from": 900, "to": 903},
    {"from": 900, "to": 904},
    {"from": 900, "to": 905},
    {"from": 900, "to": 906},
    {"from": 900, "to": 907},
    {"from": 900, "to": 908},
    {"from": 900, "to": 909},
    {"from": 900, "to": 910},
    {"from": 900, "to": 911},
    {"from": 900, "to": 912},
    {"from": 900, "to": 913},
    {"from": 900, "to": 914},
];

// help-graph end

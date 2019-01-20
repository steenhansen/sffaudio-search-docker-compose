
# SFFaudio-Search

SFFaudio-Search is a single page Javascript app that has a Node.js backend
 which uses a [Neo4j](https://neo4j.com/) graph database.
PDFs are displayed via [PDF.js](https://github.com/mozilla/pdf.js) on 
the canvas. [Vis.js](http://visjs.org/) is used for drawing the interactive graphs.
 
Can be seen by itself on [Heroku](https://sffaudio-search.herokuapp.com/).
Or in WordPress displaying ['Beyond Lies the Wub' by Philip K. Dick](https://www.sffaudio.com/search/?book=beyond-lies-the-wub&author=philip-k-dick).
 
To start the webserver:
    
    >node server-local config.local-neo4j-YOURS.js

To populate the database:

    >node reload-local config.local-neo4j-YOURS.js 


## Created by

[Steen Hansen](https://github.com/steenhansen)

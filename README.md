
# SFFaudio-Search

SFFaudio-Search is a single page Node.js app that is injected into SFFaudio.com's WordPress search page.

It enables fast and easy searching of SFFaudio's online content of authors, stories, blog-posts, PDFs, and MP3s.


 are linked in a graph 
 






 has a Node.js backend
 which uses a [Neo4j](https://neo4j.com/) graph database.
PDFs are displayed via [PDF.js](https://github.com/mozilla/pdf.js) on 
the canvas. [Vis.js](http://visjs.org/) is used for drawing the interactive graphs.
 
Can be seen by itself on [Heroku](https://sffaudio-search.herokuapp.com/).
Or in WordPress displaying ['Beyond Lies the Wub' by Philip K. Dick](https://www.sffaudio.com/search/?book=beyond-lies-the-wub&author=philip-k-dick).



![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-book.png)


![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-rsd.png)


 
To start the webserver:
    
    >node server-local config.local-neo4j-YOURS.js

To populate the database:

    >node reload-local config.local-neo4j-YOURS.js 





## Created by

[Steen Hansen](https://github.com/steenhansen)


# SFFaudio-Search

[SFFaudio-Search](https://sffaudio-search.herokuapp.com/) is a single page Node.js app that is injected into [SFFaudio.com](https://www.sffaudio.com/)'s WordPress [search](https://www.sffaudio.com/search/) page.

It enables fast and easy searching of SFFaudio's online content of 
[authors](https://www.sffaudio.com/search/?author=philip-k-dick),
[stories](https://www.sffaudio.com/search/?book=beyond-lies-the-wub&author=philip-k-dick),
[blog-posts](https://www.sffaudio.com/search/?book=beyond-lies-the-wub&author=philip-k-dick&view=post_book&choice=4), 
[PDFs](https://www.sffaudio.com/search/?book=beyond-lies-the-wub&author=philip-k-dick&view=pdf&choice=1),
 and [MP3s](https://www.sffaudio.com/search/?book=beyond-lies-the-wub&author=philip-k-dick&view=rsd&choice=1).

A [Neo4j](https://neo4j.com/) graph database holds the data, while [Vis.js](http://visjs.org/) is used to display the interactive relationships.

PDFs are displayed via [PDF.js](https://github.com/mozilla/pdf.js) on the canvas. 

#### Philip K. Dick's "Beyond Lies the Wub" found after searching for 'dick':
![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-book.png)

Note four blog posts, a PDF, an RSD MP3, a Wikipedia story link, and a link back to the author.

#### After clicking on "RSD # 7" a user can play the associated MP3 while reading along with the PDF:
![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-rsd.png)


 
To start the webserver:
    
    >node server-local config.local-neo4j-YOURS.js

To populate the database from Google Sheets:

    >node reload-local config.local-neo4j-YOURS.js 





## Created by

[Steen Hansen](https://github.com/steenhansen)

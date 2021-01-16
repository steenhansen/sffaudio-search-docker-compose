

  
  


# SFFaudio-Search, on Docker

  

[comment]: <>  ( Use https://stackedit.io/app# to edit )


  

[SFFaudio-Search](http://192.53.120.71) was a single page Node.js app that was injected into [SFFaudio.com](https://www.sffaudio.com/)'s WordPress search page. It was discontinued because of human intervention needed for manual linking of text posts. It enabled fast and easy searching of SFFaudio's online content of [authors](http://192.53.120.71/?author=larry-niven), [stories](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick), [blog-posts](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick&view=post_book&choice=4), [PDFs](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick&view=pdf&choice=1), and [MP3s](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick&view=rsd&choice=1).

  

A [Neo4j](https://neo4j.com/) graph database holds the data, while [Vis.js](http://visjs.org/) is used to display the interactive relationships. PDFs are displayed via [PDF.js](https://github.com/mozilla/pdf.js) on the canvas. The four small icons in the bottom left and right of the widget

- show help
- resize the graph to window size
- shrink the graph
- grow the graph
  

#### Philip K. Dick's "Beyond Lies the Wub" found after searching for 'dick':

![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-book.png)

Four blog posts, a PDF, an RSD, an MP3, a Wikipedia story link, and a link back to the author.

#### After clicking on "RSD # 7" a user can play the associated MP3 while reading along with the PDF:

![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-rsd.png)


## Run program locally on Windows


 

Steps | &nbsp;
------------ | -------------
Get Docker | [Download](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) Docker Desktop for Windows
Enter /server-content/ | *cd server-content*
Launch program | *run-test-large&period;sh*
View Neo4j database | *http://localhost:27474/browser*
&nbsp; | Connect URL
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **bolt://localhost:27687**
&nbsp; | Username
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **neo4j**
&nbsp; | Password
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **yer_password**
View web page | http://localhost/ 

If Neo4j has issues starting, then check /server-content/neo4j-data/logs/debug.log has 777 permissions.
  
## Install on [Linode.com](https://www.linode.com/)


Steps | &nbsp;
------------ | -------------
Create a Linode | [Make](https://cloud.linode.com/linodes/create) a 1GB Debian 10 Nanode
FTP files to server | Copy local **/server-content/** to **/root/server-content/**
Set install files to be executable | **install-1-docker-ce&period;sh** & **install-2-docker-compose&period;sh** & **install-3-check&period;sh**
ssh into server | ssh root@192.53.120.71
Enter /server-content/ | cd /root/server-content/
Install Docker | ./install-1-docker-ce.sh
Install Docker-Compose | ./install-2-docker-compose.sh
Launch program | ./run-test-small.sh
View Neo4j database | http://192.53.120.71:27474/browser
&nbsp; | Connect URL
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **bolt://192.53.120.71:27687**
&nbsp; | Username
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **neo4j**
&nbsp; | Password
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **yer_password**
View web page | http://192.53.120.71

If **run-production&period;sh** is used to launch program, instead of **run-test-small&period;sh** then then there will be no Neo4j database browser at http://192.53.120.71:27474/browser



## Created by


[Steen Hansen](https://github.com/steenhansen)
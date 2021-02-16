

  
  


# SFFaudio-Search, with Docker-compose

  

[comment]: <>  ( Use https://stackedit.io/app# to edit )


  

[SFFaudio-Search](http://192.53.120.71) was a single page Node.js app that was injected into [SFFaudio.com](https://www.sffaudio.com/)'s WordPress search page. It was discontinued because of human intervention needed for manual linking of text posts. It enabled fast and easy searching of SFFaudio's online content of [authors](http://192.53.120.71/?author=larry-niven), [stories](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick), [blog-posts](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick&view=post_book&choice=4), [PDFs](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick&view=pdf&choice=1), and [MP3s](http://192.53.120.71/?book=beyond-lies-the-wub&author=philip-k-dick&view=rsd&choice=1).

  
The data is held in Google Sheets for easy text editing; [PDF data](https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/),
 [RSD data](https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/), and 
 [Podcast data](https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/). Then a [Neo4j](https://neo4j.com/) graph database links the data, while [Vis.js](http://visjs.org/) is used to display the interactive relationships. PDFs are displayed via [PDF.js](https://github.com/mozilla/pdf.js) on the canvas. The four small icons in the bottom left and right of the widget

- show help
- resize the graph to window size
- shrink the graph
- grow the graph
  

#### Philip K. Dick's "Beyond Lies the Wub" found after searching for 'dick':

![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-book.png)

Four blog posts, a PDF, an RSD MP3, a Wikipedia story link, and a link back to the author.

#### After clicking on "RSD # 7" a user can play the associated MP3 while reading along with the PDF:

![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/beyond-the-wub-rsd.png)


## Run program locally on Windows


 

Steps | &nbsp;
------------ | -------------
Get Docker | [Download](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) Docker Desktop for Windows
Enter /server-content/ | *$ cd C:/sffaudio-search-docker-compose-master/server-content/*
Launch program | *$ run-test-large&period;sh*
View Neo4j database | *http://localhost:27474/browser*
&nbsp; | Connect URL
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **bolt://localhost:27687**
&nbsp; | Username
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **neo4j**
&nbsp; | Password
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **yer_password**
View web page | http://localhost/ 


  
## Install on [Linode.com](https://www.linode.com/)


Steps | &nbsp;
------------ | -------------
Create a Linode | [Make](https://cloud.linode.com/linodes/create) a 2GB Debian 10 Linode for $10/month
SFTP files to server | Copy local **/server-content/** to **/root/server-content/**
Set install files to be executable | **install-1-docker-ce&period;sh** & **install-2-docker-compose&period;sh** & **install-3-check&period;sh**
Set bash file to be executable | **/bash-scripts/set-time-zone&period;sh**
ssh into server | $ ssh root@192.53.120.71
Enter /server-content/ | $ cd /root/server-content/
Install Docker | $ ./install-1-docker-ce.sh (had to run it twice)
Install Docker-Compose | $ ./install-2-docker-compose.sh
Launch program | $ ./run-production.sh
Watch container creation | $ docker ps -a
View Neo4j database | http://192.53.120.71:27474/browser (currently off)
&nbsp; | Connect URL
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **bolt://192.53.120.71:27687** (currently off)
&nbsp; | Username
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **neo4j**
&nbsp; | Password
&nbsp; |   &nbsp;&nbsp;&nbsp;&nbsp;    **yer_password**
View web page | http://192.53.120.71

If **run-production&period;sh** is used to launch program, instead of **run-test-small&period;sh** then then there will be no Neo4j database browser at http://192.53.120.71:27474/browser


		
#### Containers on Docker Desktop:
![visual explanation](https://github.com/steenhansen/sffaudio-search/blob/master/docker-compose.png)


## Caveats
- The Node.js Neo4j-driver used in this project is [1.7.7](https://www.npmjs.com/package/neo4j-driver/v/1.7.7), very old, the current version is 4.2.1 and is not backwards compatible
- The [Neo4j Docker](https://hub.docker.com/_/neo4j) image used in this project is 3.4.9, very old, the current version is 4.2.2 and is not backwards compatible
- Mobile css is not handled correctly anymore as this program's output was meant to be displayed inside of Wordpress pages

## Issues  
- If you get this Docker-Compose message about the neo4j__database/4bdd0d6a0524 container being unhealthy via the node-webserver container, then check that **/server-content/neo4j-data/logs/debug.log** exists and has 777 permissions
  
```
    ERROR: node-webserver Container "4bdd0d6a0524" is unhealthy
```


- If you get the below Neo4j message then delete the **/server-content/neo4j-data/data/dbms/auth** file if it exists and then restart. This occurs when the Neo4j password changes values in secret-passwords.env 

```
    command failed: the provided initial password was not set because
    existing Neo4j users were detected at `/var/lib/neo4j/data/dbms/auth`
```


## Created by


[Steen Hansen](https://github.com/steenhansen)

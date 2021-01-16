
#   https://docs.docker.com/engine/reference/builder/
#   https://docs.docker.com/engine/reference/commandline/run/



# docker build .       --no-cache



# This file is built inside "docker-compose up"


FROM node:15.5.1-alpine3.10          


# Setup Pacific Timezone, bash for cp 
 RUN apk update && \
     apk add --no-cache tzdata && \
     apk add --update bash

WORKDIR /bash-scripts
COPY /bash-scripts/*.sh ./

ARG the_time_zone="PST8PDT"
#ARG the_time_zone="EST"
#ARG the_time_zone="UTC"

RUN sh "set-time-zone.sh" "$the_time_zone"     





#RUN sh "install-node.sh"      

WORKDIR /nodejs-base
COPY /nodejs-base/package*.json ./

## if execute 'do_modclean' also then image size 134MB, else 142MB
RUN npm ci && \
    npm run do_modclean  




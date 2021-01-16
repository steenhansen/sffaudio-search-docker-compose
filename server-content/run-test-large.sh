#!/bin/bash

#                             ./run-test-large.sh

docker build .
 
touch     ./neo4j-data/logs/debug.log              
chmod 777 ./neo4j-data/logs/debug.log

docker-compose -f docker-compose.yml -f docker-compose.override.test-large.yml up

# docker-compose -f docker-compose.yml -f docker-compose.override.test-large.yml config



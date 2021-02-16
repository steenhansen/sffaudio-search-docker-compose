#!/bin/bash

#                             ./run-test-small.sh

# Must be Unix LF, not Windows CRLF

docker build .

touch     ./neo4j-data/logs/debug.log              
chmod 777 ./neo4j-data/logs/debug.log

docker-compose -f docker-compose.yml -f docker-compose.override.test-small.yml up -d

# docker-compose -f docker-compose.yml -f docker-compose.override.test-small.yml config

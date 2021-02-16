#!/bin/bash

#                              ./install-3-check.sh

# Must be Unix LF, not Windows CRLF

echo

DOCKER_VERSION="$(docker --version)"
echo "  We have: " ${DOCKER_VERSION}
echo "  We need:  Docker version 20.10.2"

echo
echo


COMPOSE_VERSION="$(docker-compose --version)"
echo "  We have: " ${COMPOSE_VERSION}
echo "  We need:  docker-compose version 1.27.4"

echo

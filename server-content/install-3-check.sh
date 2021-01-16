#!/bin/bash

#                              ./install-4-check.sh

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

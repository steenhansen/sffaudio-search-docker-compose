#!/bin/bash

#                               ./install-2-docker-compose.sh

# FROM  https://www.linode.com/docs/guides/how-to-install-drupal-with-docker-compose-debian-10/

# NOTE  docker-compose version 1.27.4 has depends_on/condition/service_healthy start ordering

# Must be Unix LF, not Windows CRLF

sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version

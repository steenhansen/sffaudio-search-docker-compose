#!/bin/bash

#                               ./install-2-docker-ce.sh

# FROM  https://www.linode.com/docs/guides/how-to-install-docker-ce-on-debian-10/


sudo apt remove docker docker-engine docker.io

sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"

sudo apt update

sudo apt install docker-ce

sudo usermod -aG docker $USER

docker --version


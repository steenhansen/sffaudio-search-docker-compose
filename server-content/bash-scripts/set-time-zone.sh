#!/bin/sh

time_zone=$1

time_file="/usr/share/zoneinfo/${time_zone}"

cp $time_file /etc/localtime

#!bin/sh

npm run build
tar cvfz - dist | ssh root@47.100.193.148  "cd /usr/local/src/abo; rm -rf dist.tar.gz; tar xvfz -"

exit

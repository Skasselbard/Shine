#!/bin/sh

cat $1/index.html |\
awk "{gsub(\"{HOSTNAME}\",\"$HOSTNAME\",\$0); print \$0;}" |\
awk "{gsub(\"{HOSTPORT}\",\"$HOSTPORT\",\$0); print \$0;}" |\
awk "{gsub(\"{CHANNEL}\",\"$CHANNEL\",\$0); print \$0;}" > $1/i.html
mv $1/i.html $1/index.html

echo test

httpd-foreground
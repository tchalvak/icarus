#!/usr/bin/env bash

echo "Type the base api url, followed by [ENTER]: e.g. https://jpw7bvkdld.execute-api.us-east-1.amazonaws.com/dev/ "

read base

curl -G "${base}query" --data-urlencode 'query={greeting(firstName: "Icarus")}'
curl -I "${base}query"

echo -e "/nApi endpoint is  if the above x-amz-errortype is ok"
#!/bin/sh
version=""

if [ -z "$1" ]
then
  version="0.2"
else
  version=$1
fi

sh build-docker-image.sh postgres tannhauser-db postgres tannhauser_gate_dev tannhauser_gate_test "$version"


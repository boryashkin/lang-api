#!/bin/bash

# run as ". loadenv.sh cmd/test/.env" or "source loadenv.sh cmd/test/.env" or 

unamestr=$(uname)
envfile=$1
if [ ! -f "$envfile" ]; then
    echo "specify a .env file path"
    exit 1
fi

if [ "$unamestr" = 'Linux' ]; then

  export $(grep -v '^#' $envfile | xargs -d '\n')

elif [ "$unamestr" = 'FreeBSD' ] || [ "$unamestr" = 'Darwin' ]; then

  export $(grep -v '^#' $envfile | xargs -0)

fi
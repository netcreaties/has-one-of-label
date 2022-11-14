#!/bin/bash

echo $1;
echo $2;

if [[ $1 == "patch" ]] && [[ $2 == "true" ]]
then
    echo 0;
else
    echo 1;
fi
 
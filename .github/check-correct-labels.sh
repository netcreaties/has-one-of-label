#!/bin/bash

if [$1 -eq 'patch' -and $2 -eq 'true']
then
    echo 0;
else
    echo 1;
fi

#!/usr/bin/env sh

MESSAGE=$1

jest &&
git add . && 
git commit -m "$MESSAGE" &&
git push
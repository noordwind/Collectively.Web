#!/bin/bash
echo Executing after success scripts on branch $TRAVIS_BRANCH
echo Building and pushing Docker images
./ci/docker-publish-ci.sh
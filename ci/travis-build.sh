#!/bin/bash
APP_ENV=""
case "$TRAVIS_BRANCH" in
  "develop")
    APP_ENV="dev"
    ;;
  "master")
    APP_ENV="prod"
    ;;    
esac

npm install
npm rebuild node-sass
node node_modules/.bin/r.js -o rbuild.js
node node_modules/aurelia-cli/bin/aurelia-cli.js build --env $APP_ENV
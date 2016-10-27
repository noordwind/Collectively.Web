#!/bin/bash
APP_ENV=${1:-local}
WATCH=${2:---watch}
if [ $APP_ENV == "-n" ]
	then
		WATCH="-n"
		APP_ENV=local
		echo $APP_ENV
fi
if [ $WATCH == "-n" ]
	then
		WATCH=""
fi
echo Starting server using environment: $APP_ENV $WATCH...
node node_modules/.bin/r.js -o rbuild.js
node node_modules/aurelia-cli/bin/aurelia-cli.js build --env $APP_ENV $WATCH
node node_modules/pushstate-server/bin/pushstate-server . 9000
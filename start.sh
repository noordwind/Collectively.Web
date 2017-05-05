#!/bin/bash
APP_ENV=${1:-local}
WATCH=${2:--w}
if [ $APP_ENV == "-n" ]
	then
		WATCH="-n"
		APP_ENV=local
fi
node node_modules/.bin/r.js -o rbuild.js
if [ $WATCH == "-w" ]
	then
		node node_modules/aurelia-cli/bin/aurelia-cli.js run --env $APP_ENV --watch
	else
		node node_modules/aurelia-cli/bin/aurelia-cli.js build --env $APP_ENV
		node node_modules/pushstate-server/bin/pushstate-server . 9000
fi
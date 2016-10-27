IF "%1"=="" ( SET "APP_ENV=local" ) ELSE ( SET "APP_ENV=%1" )
IF "%2"=="" ( SET "WATCH=--watch" ) ELSE ( SET "WATCH=%2" )
echo Starting server using environment: $APP_ENV %WATCH...
.cmd enode node_modules/.bin/r.js -o rbuild.js
node node_modules/aurelia-cli/bin/aurelia-cli.js build --env %APP_ENV% %WATCH
node node_modules/pushstate-server/bin/pushstate-server . 9000

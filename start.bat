node node_modules/.bin/r.js -o rbuild.js
node node_modules/aurelia-cli/bin/aurelia-cli.js build --env $1
node node_modules/pushstate-server/bin/pushstate-server . 9000

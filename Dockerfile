FROM node:latest

COPY . /app
WORKDIR /app

ENV APP_ENV local
 
RUN ["npm", "install"]
RUN ["npm", "rebuild", "node-sass"]
RUN ["node", "node_modules/.bin/r.js", "-o", "rbuild.js"]

EXPOSE 9000/tcp
 
ENTRYPOINT ["node", "node_modules/aurelia-cli/bin/aurelia-cli.js", "run", "--env", $APP_ENV]
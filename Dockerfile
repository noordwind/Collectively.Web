FROM node:latest

COPY . /app
WORKDIR /app
 
RUN ["npm", "install"]
RUN ["npm", "rebuild", "node-sass"]
 
EXPOSE 9000/tcp
 
ENTRYPOINT ["node", "node_modules/aurelia-cli/bin/aurelia-cli.js", "run"]
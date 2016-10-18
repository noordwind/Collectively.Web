FROM node:latest

COPY . /app
WORKDIR /app
 
RUN ["npm", "install"]
RUN ["npm", "rebuild", "node-sass"]

EXPOSE 9000/tcp
 
CMD ["node_modules/.bin/r.js ". "-o", "rbuild.js"]
ENTRYPOINT ["node", "node_modules/aurelia-cli/bin/aurelia-cli.js", "run"]
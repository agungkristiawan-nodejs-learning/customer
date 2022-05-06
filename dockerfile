FROM node:16-alpine
WORKDIR  /usr/src/app
RUN chown node:node .
COPY package*.json ./
COPY src src
RUN apk update 
RUN npm i
USER node
ENTRYPOINT [ "node","src/App.js" ]

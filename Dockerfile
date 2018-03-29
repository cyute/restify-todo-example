FROM node:8.10.0-alpine

# set our node environment, default is production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./

RUN npm install

# bundle app source
COPY . .

# install tini, to ensure node does run on PID 1
RUN apk add --no-cache tini

EXPOSE 8080

# for security reasons, run app using node user instead of root
USER node

# use tini to start process
ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "server.js", "--prod"]

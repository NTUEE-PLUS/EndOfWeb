FROM node:14-alpine
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json /usr/src/app/
COPY client/package*.json /usr/src/app/client
COPY backend/package*.json /usr/src/app/backend
RUN yarn local-install
# Bundle app source
COPY . .
RUN yarn run build-client
EXPOSE 1993
CMD [ "node", "index.js" ]
FROM node:14
WORKDIR /app
# Install app dependencies
COPY package*.json ./
COPY client/package*.json ./client/
COPY backend/package*.json ./client/
RUN yarn local-install
# Bundle app source
COPY . .
RUN npm run build-client
EXPOSE 1993
CMD [ "node", "index.js" ]
FROM node:alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g react-scripts
COPY . .
EXPOSE 5001
CMD [ "npm", "start" ]
FROM node:latest

WORKDIR /usr/app
expose 8002


COPY package*.json ./
RUN npm install

COPY . .
CMD [ "npm","start" ]


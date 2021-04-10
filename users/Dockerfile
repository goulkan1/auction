FROM node:latest


WORKDIR /usr/src/app
expose 8001

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
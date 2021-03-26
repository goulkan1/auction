FROM node:14


WORKDIR /usr/app
ENV NODE_ENV=production
expose 8001


COPY package*.json ./
RUN npm install

COPY . .
CMD [ "npm","start" ]
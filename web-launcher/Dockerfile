FROM node:latest

ENV PORT=4000

RUN npm install webpack webpack-cli -g

WORKDIR /usr/app
COPY . /usr/app/

RUN npm run start

EXPOSE 4000
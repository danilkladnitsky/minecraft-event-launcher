FROM node:latest

RUN npm install -g forever
WORKDIR /usr/app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
EXPOSE 3000
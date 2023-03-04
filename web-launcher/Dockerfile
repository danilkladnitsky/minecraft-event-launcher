FROM node:latest

ENV PORT=4000
RUN npm install -g forever
WORKDIR /usr/app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
EXPOSE 4000
FROM node:latest

ENV PORT=4000

WORKDIR /usr/app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
RUN npm run start
EXPOSE 4000
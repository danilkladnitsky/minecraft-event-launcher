FROM node:latest as build-stage

RUN npm install -g forever
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.15 as publish
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
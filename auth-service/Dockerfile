FROM node:16-alpine3.15

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --prefer-offline --no-audit

COPY . .

COPY --from=development /usr/app/dist ./dist

EXPOSE 4000

# Run app
CMD [ "node", "dist/main" ]
FROM node:16-alpine3.15 AS development

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i -f  --silent

COPY . .

RUN npm run build

## PRODUCTION
FROM node:16-alpine3.15 AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -f

COPY . .

COPY --from=development /usr/app/dist ./dist

# Run app
CMD [ "node", "dist/main" ]
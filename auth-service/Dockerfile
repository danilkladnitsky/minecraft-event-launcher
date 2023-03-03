FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --no-audit

COPY . .

COPY --from=development /usr/app/dist ./dist

EXPOSE 4000

# Run app
CMD [ "node", "dist/main" ]
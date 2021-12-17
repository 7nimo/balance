FROM node:16.13.0 AS development

ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
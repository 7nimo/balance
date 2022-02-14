FROM node:16-alpine AS development

ENV NODE_ENV=development

WORKDIR /app

RUN corepack enable
RUN yarn set version stable

COPY package.json .
COPY yarn.lock . 

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]
FROM node:16-alpine AS development

ENV NODE_ENV=development

WORKDIR /app

COPY yarn.lock ../manifests/ 2>/dev/null || :
COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
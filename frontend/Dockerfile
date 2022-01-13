FROM node:16-alpine AS development

ENV NODE_ENV=development

WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN yarn --prod

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
FROM node:16-alpine AS development

ENV NODE_ENV=development

WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN yarn

COPY . .

CMD [ "yarn", "start" ]

### Production build

FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN yarn --prod --frozen-lockfile

COPY . .

COPY --from=development /app/dist ./dist

CMD [ "yarn", "start" ]

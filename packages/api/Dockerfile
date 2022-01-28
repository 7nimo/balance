FROM node:16-alpine AS development

ENV NODE_ENV=development

WORKDIR /app

RUN corepack enable
RUN yarn set version stable

COPY package.json .
COPY yarn.lock .
COPY .yarn/cache .

RUN yarn install --check-cache

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

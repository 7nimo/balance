FROM node:16-alpine AS builder
ENV NODE_ENV production

WORKDIR /app
COPY . .

RUN corepack enable
RUN yarn set version berry

RUN yarn install

# Development image
FROM node:16-alpine AS development

ENV NODE_ENV=development
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

RUN rm -rf /app/.yarn/unplugged && yarn rebuild

EXPOSE 4100

CMD [ "yarn", "start" ]

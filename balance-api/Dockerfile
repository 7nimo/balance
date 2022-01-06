FROM node:16-alpine AS development

ENV NODE_ENV=development

WORKDIR /app

COPY yarn.lock .
COPY package.json .

# RUN npm install -g -s --no-progress yarn && \
#     yarn && \
#     yarn run build && \
#     yarn run prune && \


RUN yarn --prod

COPY . .

CMD [ "yarn", "start" ]

### Production build

FROM node:16.13.1 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN yarn --prod --frozen-lockfile

COPY . .

COPY --from=development /app/dist ./dist

CMD [ "yarn", "start" ]

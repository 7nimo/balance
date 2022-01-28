# Install dependencies and rebuild the source code only when neededonly
FROM node:16-alpine AS builder
ENV NODE_ENV production

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY . .

RUN corepack enable
RUN yarn set version canary
RUN cd /app && echo 'YARN VERSION IN BUILDER: ' && yarn --version

RUN yarn install --immutable --immutable-cache --check-cache

# Note yarn rebuild - this is to let yarn rebuild binaries
RUN yarn rebuild 
# && yarn build

# Development image
FROM node:16-alpine AS development

ENV NODE_ENV=development
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/package.json ./package.json

# The step below is from the Next.js Dockerfile example, but we don't need it because we use Yarn's Zero-installs.
COPY --from=builder /app/node_modules ./node_modules

# Note yarn rebuild again - this is to let yarn rebuild binaries in the "runner" stage of the Dockerfile
# We also have to remove unplugged, so that rebuilding happens and replaces the old binaries
RUN rm -rf /app/.yarn/unplugged && yarn rebuild
RUN echo "YARN VERSION IN RUNNER: " && yarn --version

EXPOSE 4100

CMD [ "yarn", "start" ]

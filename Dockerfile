FROM node:alpine
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

USER node
WORKDIR /home/node/app
RUN mkdir api web
COPY --chown=node:node pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=node:node api/package.json api
COPY --chown=node:node web/package.json web
RUN pnpm i --frozen-lockfile

COPY --chown=node:node api api
COPY --chown=node:node web web
COPY package.json .env ./
ENV NODE_ENV=production
RUN pnpm db:push
RUN pnpm -r build
RUN mv web/dist api/public

WORKDIR /home/node/app/api
CMD node dist/main.js
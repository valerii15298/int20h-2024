FROM node:alpine
RUN echo 1
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

USER node
WORKDIR /home/node/app
COPY --chown=node:node pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm i --frozen-lockfile
COPY --chown=node:node . .

RUN pnpm i --frozen-lockfile
RUN pnpm -r build
RUN mv web/dist public

EXPOSE 4001
CMD node api/dist/main.js

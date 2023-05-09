FROM node:18

ARG NODE_ENV=production

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app
COPY . .

RUN NODE_ENV=development pnpm i

RUN if [ "$NODE_ENV" = "production" ]; \
  then \
    pnpm build:prod; \
  fi

EXPOSE 4173

CMD ["pnpm", "preview", "--host"]

FROM node:18

ARG DATABASE_URL
ARG SECRET

ENV COOKIE_EXPIRATION=604800
ENV NODE_ENV=production

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app
COPY . .

RUN NODE_ENV=development pnpm build
RUN if [ "$NODE_ENV" = "production" ]; \
  then \
    pnpm build:prod; \
  fi

CMD ["pnpm", "start"]
FROM node:18

# Default environment variables, please change them in production

ENV DATABASE_URL="postgres://postgres:postgres@localhost:5432/be_productive"
ENV SECRET="secret"
ENV COOKIE_EXPIRATION=604800
ENV NODE_ENV="production"

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app
COPY . .

RUN NODE_ENV=development pnpm build
RUN if [ "$NODE_ENV" = "production" ]; \
  then \
    pnpm build:prod; \
  fi

EXPOSE 3000

CMD ["pnpm", "start"]

FROM node:18

# Default environment variables, please change them in production

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=be_productive
ENV POSTGRES_HOST=localhost
# Prisma env:
ENV DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DB"

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

FROM node:18

# Default environment variables, please change them in production

ENV NODE_ENV="production"
ENV VITE_BACKEND_URL="http://localhost:3000"

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

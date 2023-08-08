FROM node:18

ARG NODE_ENV=production
ARG VITE_BACKEND_URL="http://localhost:3000"
ENV VITE_BACKEND_URL $VITE_BACKEND_URL

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app
COPY . .
COPY *.env* .

RUN NODE_ENV=development pnpm i

RUN if [ "$NODE_ENV" = "production" ]; \
  then \
    pnpm build:prod; \
  fi

EXPOSE 4173

CMD ["pnpm", "preview", "--host"]

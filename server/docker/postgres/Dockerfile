FROM postgres

# ARGS
ARG NODE_ENV
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs npm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

RUN npm i -g prisma

WORKDIR /app
COPY prisma /app/prisma
COPY package*.json .
RUN NODE_ENV=development pnpm i

RUN if [ "$NODE_ENV" = "development" ]; then \
    npm i -g ts-node; \
  fi

USER postgres

# Migration apply
RUN initdb -D /var/lib/postgresql/data
RUN pg_ctl -D /var/lib/postgresql/data start && \
    createdb $POSTGRES_DB && \
    export DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB" && \
    prisma migrate deploy && \
    if [ "$NODE_ENV" = "development" ]; \
    then prisma db seed; \
    fi

EXPOSE 5432

CMD ["postgres"]

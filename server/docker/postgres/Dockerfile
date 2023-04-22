FROM postgres

# Default environment variables, please change them in production
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=be_productive
# Prisma env:
ENV DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB"
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

RUN npm i -g prisma

WORKDIR /app
COPY prisma /app/prisma
COPY package*.json .
RUN npm i

RUN if [ "$NODE_ENV" = "development" ]; then \
    npm i -g ts-node; \
  fi

USER postgres

# Migration apply
RUN initdb -D /var/lib/postgresql/data
RUN pg_ctl -D /var/lib/postgresql/data start && \
    createdb be_productive && \
    prisma migrate deploy && \
    if [ "$NODE_ENV" = "development" ]; \
    then prisma db seed; \
    fi

EXPOSE 5432

CMD ["postgres"]
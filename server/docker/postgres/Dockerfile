FROM postgres

# Default environment variables, please change them in production
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=be_productive
# Prisma env:
ENV DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB"

RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

RUN npm i -g prisma

WORKDIR /init_db
COPY prisma /init_db/prisma

USER postgres

# Migration apply
RUN initdb -D /var/lib/postgresql/data
RUN pg_ctl -D /var/lib/postgresql/data start && \
    createdb be_productive && \
    prisma migrate deploy

EXPOSE 5432

CMD ["postgres"]
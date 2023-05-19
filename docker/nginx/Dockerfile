FROM nginx

ARG NGINX_HOST=localhost
ARG NGINX_PORT=80

ENV NGINX_HOST $NGINX_HOST
ENV NGINX_PORT $NGINX_PORT

RUN apt update && apt install -y gettext-base

COPY ./nginx.conf /etc/nginx/conf.d/default.conf.template
RUN envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

EXPOSE $NGINX_PORT
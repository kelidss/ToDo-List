FROM nginx:1.27-alpine-slim

COPY ./index.html /usr/share/nginx/html/index.html

COPY ./static/ /usr/share/nginx/html/static/

COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
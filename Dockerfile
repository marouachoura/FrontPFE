FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN chmod -R 777  nginx:nginx  /usr/share/nginx/html/*
COPY /dist/lab /usr/share/nginx/html
EXPOSE 4200

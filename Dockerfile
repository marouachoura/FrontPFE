FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN chown nginx:nginx /usr/share/nginx/html/*
COPY /dist/lab /usr/share/nginx/html
EXPOSE 4200

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Remove default config and add our own
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static UI files
COPY build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

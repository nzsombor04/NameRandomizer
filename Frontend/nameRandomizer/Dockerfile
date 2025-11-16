### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app

# Csak simán másold a package.json-eket (nem kell nameRandomizer/)
COPY package.json package-lock.json ./
RUN npm ci

# Másold a teljes projektet
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
RUN apk add --no-cache gettext

# nginx.conf bemásolása
COPY nginx.conf /etc/nginx/nginx.conf

# Build output bemásolása
COPY --from=build /usr/src/app/dist/nameRandomizer/browser /usr/share/nginx/html

# Entrypoint script bemásolása
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV BACKEND_URL=""

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

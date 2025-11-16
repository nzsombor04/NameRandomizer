### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app
COPY Frontend/nameRandomizer/package.json Frontend/nameRandomizer/package-lock.json ./
RUN npm ci
COPY Frontend/nameRandomizer/. .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
RUN apk add --no-cache gettext
COPY Frontend/nameRandomizer/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/name-randomizer/browser /usr/share/nginx/html
COPY Frontend/nameRandomizer/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENV BACKEND_URL=""
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
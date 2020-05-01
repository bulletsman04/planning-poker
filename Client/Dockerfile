### STAGE 1: Build ###
FROM node:12.7-alpine AS build

WORKDIR /usr/src/app
COPY . .


RUN npm i
RUN npm run build-prod

### STAGE 2: Run ###
FROM nginx
COPY --from=build /usr/src/app/dist/Client /usr/share/nginx/html
COPY --from=build /usr/src/app/default.conf /etc/nginx/conf.d/

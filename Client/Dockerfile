# FROM node:13
# WORKDIR /app
# COPY package.json /app
# RUN npm install ; npm install -g @angular/cli
# COPY . /app
# CMD ng serve --host 0.0.0.0
# EXPOSE 4200

## STAGE 1
FROM node:13 as node
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

## STAGE 2
FROM nginx:latest
COPY --from=node /src/app/dist/client usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

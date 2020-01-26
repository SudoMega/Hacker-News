FROM node:13
WORKDIR /app
COPY package.json /app
RUN npm install ; npm install -g @angular/cli
COPY . /app
CMD ng serve --host 0.0.0.0
EXPOSE 4200

# ## STAGE 1
# FROM node:13 as node
# WORKDIR /app
# COPY . .
# RUN npm install
# ARG env==prod
# RUN npm run build

# ## STAGE 2
# FROM nginx:latest
# COPY --from=node /app/dist/hacker-news-client usr/share/nginx/html


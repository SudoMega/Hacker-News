FROM node:13
WORKDIR /app
COPY package.json /app
RUN npm install ; npm install -g @angular/cli
COPY . /app
CMD ng serve --host 0.0.0.0
EXPOSE 4200

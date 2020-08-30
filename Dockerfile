FROM node:12-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 3000

CMD nodemon -L --watch . ./bin/www
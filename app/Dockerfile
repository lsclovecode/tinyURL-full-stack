FROM node:9.2.0

RUN npm install -g nodemon

RUN mkdir -p /app

WORKDIR /app

ADD . /app

RUN cd /app && npm install

EXPOSE 3000

CMD ["nodemon", "/app/server.js"]
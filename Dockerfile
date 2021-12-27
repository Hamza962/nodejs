FROM node:14.16.1

ENV NAME=Abdullah
RUN  if [ ! -d "/usr/src/app" ]; then mkdir /usr/src/app;fi
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 8081
CMD [ "node", "index.js" ]

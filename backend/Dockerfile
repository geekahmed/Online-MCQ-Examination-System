FROM node:16.20.2-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]
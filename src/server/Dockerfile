FROM node:lts-buster-slim as builder

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

EXPOSE 1905

RUN apt-get update

RUN npm i -g npm@latest
RUN mkdir /opt/carsapi

WORKDIR /opt/carsapi

COPY package.json package-lock.json* ./
ENV PATH /opt/carsapi/node_modules/.bin:$PATH

COPY . .

RUN npm install

WORKDIR /opt/carsapi

CMD [ "node", "main.js" ]
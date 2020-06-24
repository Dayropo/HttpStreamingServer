FROM node:8

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update -y --allow-unauthenticated
RUN apt-get install -y git

RUN git clone https://github.com/DEgITx/rats-search

# Create app directory
WORKDIR /usr/src/app/rats-search

RUN npm install

RUN npm run buildweb



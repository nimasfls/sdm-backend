FROM registry.nimasfl.ir/node-alpine:14
WORKDIR /app

COPY package.json .
RUN npm install

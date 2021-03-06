FROM node:8.11.3-alpine

ARG YOUTUBE_ID
ARG YOUTUBE_SECRET
ARG JWT_SECRET


ENV YOUTUBE_ID="${YOUTUBE_ID}"
ENV YOUTUBE_SECRET="${YOUTUBE_SECRET}"
ENV JWT_SECRET="${JWT_SECRET}"

WORKDIR app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD npm start

FROM node:16.5-alpine3.14

WORKDIR /app

RUN apk add --update \
    ffmpeg

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8000
ENV NODE_ENV='production' 
ENV TORRENT_DL_PATH='/var/www/temp/torrent/complete'

EXPOSE 8000

CMD ["npm","run","start"]
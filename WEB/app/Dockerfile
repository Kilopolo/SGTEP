FROM node:20-alpine3.19

# COPY [host machine][container]( paths are relative to the Dockerfile, second is relative to root on the container)
COPY package.json package-lock.json 

RUN npm install

COPY . . 

RUN npm run build
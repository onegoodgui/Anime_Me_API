FROM node:16.15
WORKDIR /usr/src/anime-me
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
RUN npm i --production
EXPOSE 5000
COPY . .
RUN npm run build
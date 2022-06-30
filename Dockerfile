FROM node:16.15
WORKDIR /usr/src/anime-me
COPY . .
RUN npm i --production
CMD ["npm", "run", "dev"]
EXPOSE 5000
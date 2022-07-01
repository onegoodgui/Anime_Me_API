FROM node:16.15
WORKDIR /usr/src/anime-me
COPY . .
RUN npm i --production
EXPOSE 5000
CMD ["npm", "run", "build"]
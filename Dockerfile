FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm i --production
CMD ["npm", "run", "dev"]
EXPOSE 5000
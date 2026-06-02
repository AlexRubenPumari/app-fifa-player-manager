FROM node:22-alpine

WORKDIR /app/apps/api

COPY domain /app/domain

COPY apps/api/package*.json ./

RUN npm install

COPY apps/api .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
FROM node:14-alpine

WORKDIR /app
COPY .env.example .env
COPY . /app
RUN npm install --production

EXPOSE 3333

CMD ["npm", "start"]
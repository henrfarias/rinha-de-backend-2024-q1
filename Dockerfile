FROM node:20-alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY dist/ .

RUN npm install --production --freeze-lockfile

CMD ["node", "framework/http/server.js"]

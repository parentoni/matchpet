FROM node:21-alpine3.18 as base

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . . 

FROM base as production

# Set the environment to production
ENV NODE_ENV=production
ENV NODE_PATH=./dist

RUN npm run build
COPY . . 

CMD ["npm", "run", "start-production"]

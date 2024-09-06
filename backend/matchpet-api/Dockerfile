FROM node:21-alpine3.18 as base

WORKDIR /app

COPY package*.json ./

run npm i 

copy . . 

FROM base as production

# Set the environment to production
ENV NODE_ENV=production
ENV NODE_PATH=./dist

RUN npm run build
copy . . 

CMD ["npm", "run", "start-production"]

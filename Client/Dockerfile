FROM node:12.2.0-alpine
WORKDIR /app

COPY package.json .
RUN yarn

RUN yarn global add react-scripts
RUN yarn global add typescript
COPY . .

ENTRYPOINT ["yarn", "start"]
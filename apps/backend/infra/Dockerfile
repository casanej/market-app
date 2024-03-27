FROM node:20-alpine

ARG ENV
ENV NODE_ENV=$ENV

RUN dir -s

RUN npm install -g @nestjs/cli
RUN yarn install
RUN yarn workspace backend build

EXPOSE 3000

RUN echo "env: $NODE_ENV"
CMD npm run start:"$NODE_ENV"
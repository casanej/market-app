FROM node:20

ARG ENV
ENV NODE_ENV=$ENV

RUN npm install -g @nestjs/cli
RUN yarn install
RUN yarn workspace backend build

CMD npm run start:"$NODE_ENV"
FROM node:20

RUN npm install -g @nestjs/cli
RUN yarn install --production
RUN npm run build

CMD npm run start:"$NODE_ENV"
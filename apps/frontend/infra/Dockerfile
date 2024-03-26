FROM node:20

RUN npm install -g yarn
RUN yarn install --production
RUN npm run build

CMD npm run start:"$NODE_ENV"
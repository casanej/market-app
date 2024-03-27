FROM node:20

RUN mkdir apps/backend
WORKDIR apps/backend

COPY apps/backend .

RUN dir -s

RUN npm install -g @nestjs/cli
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD npm run start:"$NODE_ENV"
FROM node:20

RUN mkdir apps/backend
WORKDIR apps/backend

COPY apps/backend .

RUN npm install -g yarn
RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 3000

CMD npm run start:"$NODE_ENV"
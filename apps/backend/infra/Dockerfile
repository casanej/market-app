FROM node:20-alpine

ARG ENV
ENV NODE_ENV=$ENV

RUN mkdir -p app/backend
WORKDIR app/backend

COPY ../ .

RUN npm install -g @nestjs/cli
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
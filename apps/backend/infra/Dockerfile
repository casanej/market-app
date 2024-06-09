FROM node:20-alpine

ARG ENV
ENV NODE_ENV=$ENV

RUN mkdir -p app/backend
RUN mkdir -p packages

WORKDIR app/backend
COPY ./apps/backend .

WORKDIR packages
RUN mkdir -p market-app-bff-models
COPY ./packages/market-app-bff-models/src ./market-app-bff-models

RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
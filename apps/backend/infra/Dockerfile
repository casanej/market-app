FROM node:20-alpine

ARG ENV
ENV NODE_ENV=$ENV

RUN mkdir -p app/backend
WORKDIR app/backend

COPY ./apps/backend .

RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
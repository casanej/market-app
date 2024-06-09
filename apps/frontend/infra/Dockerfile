FROM node:20

RUN mkdir apps/backend
WORKDIR apps/backend

COPY apps/backend .

RUN npm install -g yarn
RUN npm install --frozen-lockfile
RUN npm run build

EXPOSE 3000

CMD npm run start:"$NODE_ENV"
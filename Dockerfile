FROM node:lts AS dev
WORKDIR /app
COPY package* ./
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000

FROM node:lts AS build
WORKDIR /app
COPY package* ./
RUN yarn install
COPY public ./public
COPY src ./src
RUN yarn run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
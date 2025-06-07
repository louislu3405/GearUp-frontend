FROM node:lts AS dev
WORKDIR /app
COPY package* ./
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000

# Build dev image:
# docker build --target dev -t gear-up-frontend-dev .

# Run container:
# docker run --rm -v %cd%:/app -p 3000:3000 gear-up-frontend-dev

FROM node:lts AS build
WORKDIR /app
COPY package* ./
RUN yarn install
COPY public ./public
COPY src ./src
RUN yarn run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine AS production

WORKDIR /app

RUN npm install -g http-server

COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["http-server", "dist", "-p", "3000"]

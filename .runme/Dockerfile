FROM node:14.0.0
WORKDIR /scribden
COPY . .
RUN npm install && npm run build
ENTRYPOINT npm run prod
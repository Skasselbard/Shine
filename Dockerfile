# build stage: get the source and compile
FROM node:current-alpine as build
WORKDIR /src

COPY . .
RUN npm install --production
RUN npm run build

#####################################################

# execution stage: get the compiled build and execute it
FROM node:current-alpine
WORKDIR /shine

COPY --from=build "/src/build/" "./"
RUN npm install http-server -g
CMD ["http-server", "-p", "80"]

# its a web service: listen on port 80
EXPOSE 80
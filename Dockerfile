# build stage: get the source and compile
FROM node:current-alpine as build
WORKDIR /src

COPY . .
RUN npm install --production
RUN npm run build

#####################################################

# execution stage: get the compiled build and execute it
FROM httpd:alpine

COPY --from=build "/src/build/" "/usr/local/apache2/htdocs/"

# its a web service: listen on port 80
EXPOSE 80
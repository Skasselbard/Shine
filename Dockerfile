# build stage: get the source and compile
FROM node:current-alpine as build
WORKDIR /src

COPY . .
RUN npm install --production
RUN npm run build

#####################################################

# execution stage: get the compiled build and execute it
FROM httpd:alpine

# mqtt broker address
ENV HOSTNAME localhost 
# mqtt broker port
ENV HOSTPORT 9001
# mqtt broker channel
ENV CHANNEL control/wohnzimmer/licht/all

COPY --from=build "/src/build/" "/usr/local/apache2/htdocs/"
COPY ./src/configure.sh .

# its a web service: listen on port 80
EXPOSE 80
CMD ["configure.sh /usr/local/apache2/htdocs/ && httpd-foreground"]
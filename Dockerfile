FROM node:10.15.2
MAINTAINER Evan Bechtol "evan.bechtol@ericsson.com"

# Update the below proxy and timezone arguments using "--build-arg" inputs during "docker build"
ARG http_proxy=''
ARG https_proxy=''
ARG TZ=America/Chicago

# Set the proxy and timezone environment variables using "-e" inputs during "docker run"
ENV http_proxy=${http_proxy} https_proxy=${https_proxy} no_proxy=${no_proxy} TZ=${TZ}

RUN echo ${TZ} > /etc/timezone

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install --production

EXPOSE 3000
CMD [ "npm", "run", "start" ]

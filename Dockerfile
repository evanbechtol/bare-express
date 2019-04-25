FROM scmgr.eams.ericsson.net:5005/docker/node-base:10
MAINTAINER Evan Bechtol "evan.bechtol@ericsson.com"

# Update the below proxy and timezone arguments using "--build-arg" inputs during "docker build"
ARG http_proxy=http://10.125.198.138:8080
ARG https_proxy=http://10.125.198.138:8080
ARG TZ=America/Chicago

# Set the proxy and timezone environment variables using "-e" inputs during "docker run"
ENV http_proxy=${http_proxy} https_proxy=${https_proxy} no_proxy=${no_proxy} TZ=${TZ}

RUN echo ${TZ} > /etc/timezone

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install --production

EXPOSE 3000
CMD [ "npm", "start" ]

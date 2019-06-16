FROM woahbase/alpine-android

# Create app directory
WORKDIR /usr/src/app
USER root
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk add zip
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN mkdir projects

EXPOSE 3000
CMD [ "start.sh" ]

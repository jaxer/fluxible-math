FROM frozeneye/aarch64-nodejs
WORKDIR /usr/src/app/
ADD package.json package.json
RUN npm install
RUN npm build
ADD . .

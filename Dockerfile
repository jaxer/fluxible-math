FROM aarch64/ubuntu
RUN apt-get update && apt-get install -y \
    nodejs \
    npm
WORKDIR /usr/src/app/
ADD package.json package.json
RUN npm install
ADD . .

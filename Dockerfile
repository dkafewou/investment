FROM node:14-alpine
ENV NODE_ENV=production
ENV NBP_WEB_API="http://api.nbp.pl"

# Create app directory and use it as the working directory
RUN mkdir -p /home/src/investment
WORKDIR /home/src/investment/

COPY package*.json /home/src/investment/

RUN npm install

COPY . /home/src/investment/

CMD ["npm", "run", "execute"]

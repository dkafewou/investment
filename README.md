# Investment
Using NBP Web Api "http://api.nbp.pl", we create script that checks what was the best
investment in gold during the last 5 years.

##How to set up (MacOS)
requirement: node14, docker (if you running it as docker container)

- Clone the repo git clone https://github.com/dkafewou/investment.git and cd investment

- Install dependencies: `npm install`

- Run the script `npm run execute` to find the best buy and sell value from the last past 5 years

- To run the test: `npm run test`

## Run with docker

- Build the container: `docker build -t investment .`

- Run the image: `docker run investment`

- Run test: `docker run -e CI=true investment npm run test`

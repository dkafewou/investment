import Config from "./helpers/Config"
import NBPWebAPI from "./helpers/NBPWebAPI"
import logger from "./helpers/logger"

// Verify config
Config.shared.verify()

// Script that will check what was the best investment in gold during the last 5 years.
const run = async () => {
  try {
    // Fetch last past 5 years gold price from nbp web api
    const data = await NBPWebAPI.getGoldLast5YearsPrices()
    const bestInterval = NBPWebAPI.getHighestInterval(data)

    console.log(bestInterval)
  } catch (err) {
    throw err
  }
}

// Execute script
run()
  .then(() => {
    logger.info("successfully run the script")
  }).catch((err) => {
  logger.error(`Could not run the script to find best gold investment: ${err}`)
})

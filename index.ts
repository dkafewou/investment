import Config from "./helpers/Config"
import logger from "./helpers/logger"
import { run } from "./helpers/Script"

// Verify config
Config.shared.verify()

// Execute script
run()
  .then((interval) => {
    logger.info("successfully run the script")
    if (interval == null) {
      console.log("-------------------------------------------------------------------------------------------")
      console.log("No best time found to buy and sell gold for highest profit")
      return
    }
    console.log("-------------------------------------------------------------------------------------------")
    console.log(`Best time to buy gold is: ${interval.buyDate} at: ${interval.buy}`)
    console.log(`Best time to sell gold for the highest profit is: ${interval.sellDate} at: ${interval.sell}`)
    console.log("-------------------------------------------------------------------------------------------")
  }).catch((err) => {
  logger.error(`Could not run the script to find best gold investment: ${err}`)
})

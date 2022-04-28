import pino from "pino"
import Config from "./Config"

let prettyPrint

if (Config.shared.modeIsProductionOrStaging) {
  prettyPrint = {
    levelFirst:    true,
    translateTime: true,
  }
} else {
  prettyPrint = false
}

export default pino({ prettyPrint })

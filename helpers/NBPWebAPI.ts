import Config from "./config"
import axios, { AxiosInstance } from "axios"
import logger from "./logger"
import moment = require("moment")

const NBP_WEB_API = Config.shared.require("NBP_WEB_API")

let client: AxiosInstance | null

export default class NBPWebAPI {
  static get shared(): AxiosInstance {
    if (client == null) {
      client = axios.create({
        baseURL: NBP_WEB_API,
        headers: {
          "Content-Type": "application/json",
          "Accept":       "application/json",
        },
      })
    }

    return client
  }

  static async getGoldLast5YearsPrices(): Promise<Response[]> {
    try {
      // Get start and end date
      const today = moment()
      const startDate5 = moment().subtract(1, "years")
      const startDate4 = moment().subtract(2, "years")
      const startDate3 = moment().subtract(3, "years")
      const startDate2 = moment().subtract(4, "years")
      const startDate = moment().subtract(5, "years")

      // Get last past gold prices yearly intervals
      const [response1, response2, response3, response4, response5] = await Promise.all([
        NBPWebAPI.shared.get<Response[]>(`/api/cenyzlota/${startDate.format("YYYY-MM-DD")}/${startDate2.format("YYYY-MM-DD")}/`),
        NBPWebAPI.shared.get<Response[]>(`/api/cenyzlota/${startDate2.format("YYYY-MM-DD")}/${startDate3.format("YYYY-MM-DD")}/`),
        NBPWebAPI.shared.get<Response[]>(`/api/cenyzlota/${startDate3.format("YYYY-MM-DD")}/${startDate4.format("YYYY-MM-DD")}/`),
        NBPWebAPI.shared.get<Response[]>(`/api/cenyzlota/${startDate4.format("YYYY-MM-DD")}/${startDate5.format("YYYY-MM-DD")}/`),
        NBPWebAPI.shared.get<Response[]>(`/api/cenyzlota/${startDate5.format("YYYY-MM-DD")}/${today.format("YYYY-MM-DD")}/`)
      ])

      // Return merged data of all past 5years
      return response1.data.concat(
        response2.data,
        response3.data,
        response4.data,
        response5.data
      )
    } catch (err) {
      logger.error(`Could not fetch NBP data: ${err}`)
      throw err
    }
  }

  static getHighestInterval(data: Response[]): Interval|null {
    const intervals: Interval[] = []
    let interval: Interval | null = null

    data.forEach((price) => {
      // Set the buy and sell price to the first data at the beginning
      if (interval == null) {
        interval = {
          buy: price.cena,
          sell: price.cena,
          buyDate: price.data,
          sellDate: price.data
        }
      } else {
        // Set new sell price when we have higher selling market price
        if (interval.sell < price.cena) {
          interval = {
            ...interval,
            sell: price.cena,
            sellDate: price.data
          }
        }

        // Push interval to intervals array and set interval to new lower market price
        if (interval.buy > price.cena) {
          intervals.push(interval)
          interval = {
            buy: price.cena,
            sell: price.cena,
            buyDate: price.data,
            sellDate: price.data
          }
        }
      }
    })

    // Push the last interval at the end of the loop if not null
    if (interval != null) intervals.push(interval)

    // Sort intervals array
    intervals.sort((a,b) => (b.sell - b.buy) - (a.sell - a.buy))

    if (intervals.length) return intervals[0]
    return null
  }
}

export interface Response {
  data: string
  cena: number
}

export interface Interval {
  buy: number
  sell: number
  buyDate: string
  sellDate: string
}

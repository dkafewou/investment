import NBPWebAPI, { Interval } from "./NBPWebAPI"

// Script that will check what was the best investment in gold during the last 5 years.
export const run = async (): Promise<Interval | null> => {
  try {
    // Fetch last past 5 years gold price from nbp web api
    const data = await NBPWebAPI.getGoldLast5YearsPrices()
    return  NBPWebAPI.getHighestInterval(data)
  } catch (err) {
    throw err
  }
}

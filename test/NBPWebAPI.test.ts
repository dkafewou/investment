import { expect, assert, should } from "chai"
import sinon = require("sinon")
import NBPWebAPI from "../helpers/NBPWebAPI"
import data from "./fixtures/NBPResponse"
import { run } from "../helpers/Script"

should()

describe("Gold best investment script", () => {
  const sandbox = sinon.createSandbox()

  describe("NBPWebAPI.getHighestInterval", () => {
    it("should return Interval object with best buy and sell", async () => {
      const interval = NBPWebAPI.getHighestInterval(data)

      expect(interval).to.be.an("object")
      assert(interval?.buy === 5, "Best buy price")
      assert(interval?.sell === 600, "Best sell price")
    })
  })

  describe("index.run", () => {
    before("All tests, mock NBPWebAPI.getGoldLast5YearsPrices", async () => {
      sandbox.stub(NBPWebAPI, "getGoldLast5YearsPrices").callsFake(async () => data)
    })

    it("should return Interval object with best buy and sell", async () => {
      const interval = await run()

      expect(interval).to.be.an("object")
      assert(interval?.buy === 5, "Best buy price")
      assert(interval?.sell === 600, "Best sell price")
    })

    after("All tests, drop restore sandbox", async () => {
      await sandbox.restore()
    })
  })

  describe("index.run with empty API result", () => {
    before("All tests, mock NBPWebAPI.getGoldLast5YearsPrices", async () => {
      sandbox.stub(NBPWebAPI, "getGoldLast5YearsPrices").callsFake(async () => [])
    })

    it("should return null", async () => {
      const interval = await run()

      expect(interval).to.be.an("null")
    })

    after("All tests, drop restore sandbox", async () => {
      await sandbox.restore()
    })
  })
})

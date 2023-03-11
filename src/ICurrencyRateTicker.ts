
import type { CurrencyEnum }		from "@emmveqz/currency-reports-core-enums"
import {
  MyAsyncGenerator,
}								from "./IUtils"

//

export type ICurrencyRateTickResult = {
  rate:		number,
  volume?:	number,
  error?:		Error,
  /**
   * Redundant for standalone tickers, but useful for many-in-one tickers.
   */
  symbol?:	CurrencyEnum,
}

export interface ICurrencyRateTicker {

  secsPerTick: number

  Tick(currency: CurrencyEnum): MyAsyncGenerator<ICurrencyRateTickResult, Error|void>

}

export default ICurrencyRateTicker


import type { CurrencyEnum }					from "@emmveqz/currency-reports-core-enums"
import ICurrencyRateTicker, {
  ICurrencyRateTickResult,
}										from "./ICurrencyRateTicker"
import {
  MyAsyncGenerator,
}										from "./IUtils"

//

export type ICurrencyRateTickerForManyResult = {
  [enumId in CurrencyEnum]?: Error | {
    rate:		number,
  }
}

export interface ICurrencyRateTickerForMany extends ICurrencyRateTicker {

  OpenWS(): Promise<boolean|Error>

  TickMany(currencies: Array<CurrencyEnum>): MyAsyncGenerator<ICurrencyRateTickResult, Error|void>

}

export default ICurrencyRateTickerForMany

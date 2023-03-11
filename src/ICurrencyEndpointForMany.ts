
import type { CurrencyEnum }					from "@emmveqz/currency-reports-core-enums"
import ICurrencyEndpoint				from "./ICurrencyEndpoint"
import {
  ICurrencyRateTickerForManyResult,
}										from "./ICurrencyRateTickerForMany"
import {
  JsonObj,
}										from "./IUtils"

//

export interface ICurrencyEndpointForMany extends ICurrencyEndpoint {

  GetURIForMany(currencies: Array<CurrencyEnum>): string

  ParseApiResultForMany(json: JsonObj): ICurrencyRateTickerForManyResult

  SerializeParams(currencies: Array<CurrencyEnum>): string | Error

}

export default ICurrencyEndpointForMany

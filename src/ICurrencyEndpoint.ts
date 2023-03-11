
import type { CurrencyEndpointEnum }			from "@emmveqz/currency-reports-core-enums"
import type { CurrencyEnum }						from "@emmveqz/currency-reports-core-enums"
import {
  ICurrencyRateTickResult,
}										from "./ICurrencyRateTicker"
import {
  JsonObj,
}										from "./IUtils"

export interface ICurrencyEndpoint {

  GetEndpoint(): CurrencyEndpointEnum

  GetURI(currency: CurrencyEnum): string

  ParseApiResult(json: JsonObj): ICurrencyRateTickResult|Error

}

export default ICurrencyEndpoint

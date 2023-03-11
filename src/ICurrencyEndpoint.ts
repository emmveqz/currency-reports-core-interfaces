
import type { CurrencyEndpointEnum }			from "btc-reports-core-enums"
import type { CurrencyEnum }						from "btc-reports-core-enums"
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

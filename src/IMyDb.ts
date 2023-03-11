
import { IAnyObj } from "./IBaseBo"
import {
	MyAsyncGenerator,
} from "./IUtils"

export type DbRow = IAnyObj

export type NewRowRes = {
	NewId: number,
	CreationDate: string,
}

export type DbConnection = {
	Host: string,
	User: string,
	Pass: string,
	Database: string,
}

export type DbErrorResult = {
	ErrorMsg: string,
	Success: false,
}

export type DbResult<T> = {
	Success: true,
	Value: T,
} | DbErrorResult

export interface IMyDb {
	Get(queryBuilder: string|Error): Promise<DbResult<DbRow | null>>
	/**
	 * When not updating or inserting rows, should not evaluate `DbResult.Value`,
	 * since it might not be equals `true`
	 * @param queryBuilder
	 */
	Execute(queryBuilder: string|Error): Promise<DbResult<boolean>>
	NewRow(queryBuilder: string|Error): Promise<DbResult<NewRowRes>>
	List(queryBuilder: string|Error): Promise<DbResult<DbRow[]>>
	StreamList(queryBuilder: string|Error, bufferSize?: number): MyAsyncGenerator<DbRow[]>
}
export default IMyDb

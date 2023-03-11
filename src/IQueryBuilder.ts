
import { BoPropVal, IBaseBo, IBaseBoFactory } from "./IBaseBo"
import {
	JsVal,
} from "./IUtils"

export interface IBo { readonly [prop: string]: BoPropVal }

/**
 * A simplified version of `IBaseBo` -> `IBaseBoFactory`.
 */
export interface IBoFactory {
	new(): IBo
}

export type OrderBy = {
	Prop: string,
	Desc?: boolean,
}

export type Page = {
	/**
	 * Starting at 1.
	 */
	Page: number,
	Size: number,
}

/**
 * @note THIS MUST BE REFLECTED AT FILE /protos/enums.proto
 */
export enum SqlCond {
	AND,
	OR,
}

/**
 * @note THIS MUST BE REFLECTED AT FILE /protos/enums.proto
 */
export enum SqlOptr {
	Equal,
	Different,
	Greater,
	Less,
	Contain,
	BeginWith,
	EndWith,
	In,
}

export type SqlJsVal = {
	0: JsVal,
} & JsVal[]

export type QryClause = {
	Optr: SqlOptr,
	Prop: string,
	RightClauses: undefined,
	InnerClsCond: undefined,
	NextClsCond?: SqlCond,
	/**
	 * Applies only for:
	 * `SqlOptr.Contain`,
	 * `SqlOptr.BeginWith`,
	 * `SqlOptr.EndWith`,
	 * `SqlOptr.In`
	 */
	NotOptr?: boolean,
	Val: SqlJsVal,
} | {
	Optr: SqlOptr,
	Prop: string,
	RightClauses: QryClause[],
	InnerClsCond: SqlCond,
	NextClsCond?: SqlCond,
	/**
	 * Applies only for:
	 * `SqlOptr.Contain`,
	 * `SqlOptr.BeginWith`,
	 * `SqlOptr.EndWith`,
	 * `SqlOptr.In`
	 */
	NotOptr?: boolean,
	Val: SqlJsVal,
}

export type ISqlCol = {
	/**
	 * Allow only [A-Za-z] RegEx
	 */
	alias?:	string,
	col:	string,
}

export interface IQueryBuilder<TBo extends IBo|IBaseBo = IBo, TFactory extends IBoFactory|IBaseBoFactory = IBoFactory> {
	GetSqlCmd(): string|Error
	SetPaging(page: Page): this
	/**
	 * @param skip Defaults `true`
	 */
	SkipOrder(skip: boolean): this
	BuildGetNewGuidCmd(factory: TFactory): this
	BuildGetCmd(id: number, factory: TFactory, columns?: ISqlCol[]): this
	BuildListCmd(factory: TFactory, columns?: ISqlCol[], qry?: QryClause): this
	BuildCreateCmd(bo: TBo): this
	BuildUpdateCmd(bo: TBo, dynProps?: IBaseBo[], avoidSystemLocked?: boolean): this
	BuildDeleteCmd(idOrQry: number|{ qry: QryClause }, factory: TFactory, dynProps?: IBaseBo[], avoidSystemLocked?: boolean): this
}
export default IQueryBuilder


export type ISelf<T> = {
  [K in keyof T]: T[K]
}
export type BoPropVal = string | number | boolean | BoPropVal[] | null
export type PlainObj = { [prop: string]: BoPropVal }
export type IAnyObj = { [prop: string]: any }
export type IPropsNames<T extends IBaseBo> = {
  [prop in (keyof T)]: prop
}

export interface IBaseBo {
  Id: number
  CreationDate: string
  CreatedByUserId: number
  GetEntityName(): string
  FillFrom(obj: IAnyObj, dynProps?: IBaseBo[], forceTypeCheck?: boolean): this
  NewEmptyOrig(): this
  RemoveDecorator<P extends keyof this>(metadataKey: string, property: P): boolean
  OverrideDecorator(metadataKey: string, property: string, newVal: BoPropVal): boolean
  /**
   * @param nullable To comply with `google.protobuf.Struct`
   */
  ToPlainObj(nullable?: boolean): ISelf<this>
  copy(): this
}

/**
 * @Note Properties be values, and methods be methods. Careful not defining a property as a (arrow) function.
 */

export interface IBaseBoFactory<T extends IBaseBo = IBaseBo> {
  new(): T

  CreateNew<T2 extends T>(): T2

  Parse<T2 extends T>(bo: IAnyObj, dynProps?: IBaseBo[]): T2

  ParseList<T2 extends T>(list: IAnyObj[], dynProps?: IBaseBo[]): T2[]

  IsPropValValid(val: any): boolean

  /**
   * We need to pass a redundant factory to create a map type of the properties for intellisense purpose.
   */
  getPropNames<T2 extends IBaseBo>(factory: IBaseBoFactory<T2>): IPropsNames<T2>
}

export default IBaseBo

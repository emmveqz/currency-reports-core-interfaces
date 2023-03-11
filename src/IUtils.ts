
export type IDateFormat = "american"|"european"|"japanese"

export type JsVal = string | number | boolean | JsVal[] | null

export type JsonObj = { [prop: string]: JsVal | JsonObj }

export type NextRequest = { abort?: boolean, waitFor?: Promise<void> } | undefined

export type MyAsyncGenerator<T, R = void> = AsyncGenerator<T, R, NextRequest>

export type IFuncArgs<T> = T extends (...args: infer A) => any ? A : never

export type INewable<Constructor extends (...args: any[]) => ReturnType<Constructor>> = { new(...args: IFuncArgs<Constructor>): ReturnType<Constructor> }

export type IEnumLike<T = unknown> = {
  [name: string]: T | string,
  [idx: number]: string,
}

export type IValOf<T extends {}, substractType = undefined> = T extends { [prop in keyof T]: infer Val }
  ? substractType extends undefined
      ? Val
      : Val extends substractType
        ? never
        : Val
  : never

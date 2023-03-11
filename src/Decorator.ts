
/**
 * @module Decorator
 * @ToDo Perhaps use Symbols for MetadataKeys definitions instead?
 * @summary
 * Let's hope Microsoft don't actually do any breaking changes as they warn at
 * their site LOL, whenever/if they standardize the 'reflect-metadata' library.
 */
import "reflect-metadata"

export function HasDecorator(metadataKey: string, target: object, property?: string | symbol): any {
  return property === undefined
    ? Reflect.hasMetadata(metadataKey, target) && !!Reflect.getMetadata(metadataKey, target)
    : Reflect.hasMetadata(metadataKey, target, property) && !!Reflect.getMetadata(metadataKey, target, property)
}

export function GetDecoratorValue(metadataKey: string, target: object, property: string | symbol): any {
  return Reflect.getMetadata(metadataKey, target, property)
}

export function GetDecoratorsKeys(target: object, property: string | symbol): any[] {
  return Reflect.getMetadataKeys(target, property)
}

export function OverrideDecorator(metadataKey: string, target: object, property: string | symbol, newVal: any): boolean {
  const oldVal = GetDecoratorValue(metadataKey, target, property)
  Reflect.defineMetadata(metadataKey, newVal, target, property)
  const updateVal = GetDecoratorValue(metadataKey, target, property)

  // tslint:disable-next-line: triple-equals
  return oldVal != updateVal
}

export function RemoveDecorator(metadataKey: string, target: object, property: string | symbol): boolean {
  return OverrideDecorator(metadataKey, target, property, false)
}

export function Set(metadataVal: any, metadataKey: string = "DecoratorMetaKey") {
  return (target: object, property: string | symbol): void => {
    Reflect.defineMetadata(metadataKey, metadataVal, target, property)
  }
}

/**
 * Sample for decorating classes
 * @param constructor
 */
export const SystemLockable = <T extends new(...args: any[]) => {}>(constructor: T): T => {
  return class extends constructor {
    public IsSystemLockable = true
  }
}

export namespace Db {
  export const IsPrimaryKeyKey: string = "IsPrimaryKeyKey"
  export const IsSystemPropKey: string = "IsSystemPropKey"
  export const MandatoryKey: string = "MandatoryKey"
  export const UniqueKey: string = "UniqueKey"
  export const UniqueUnionKey: string = "UniqueUnionKey"
  export const IsNonInsertableKey: string = "IsNonInsertableKey"
  export const IsNonUpdatableKey: string = "IsNonUpdatableKey"
  export const DefaultOrderByKey: string = "DefaultOrderByKey"
  export const IsVirtualKey: string = "IsVirtualKey"
  export const MakesClassSysLockableKey: string = "MakesClassSysLockableKey"
  export const HasInsertableDefaultKey: string = "HasInsertableDefaultKey"

  export function IsPrimaryKey(target: object, property: string | symbol) {
    Reflect.defineMetadata(IsPrimaryKeyKey, true, target, property)
  }

  /**
   * Cannot be deleted, plus aknowldeging for some other rules
   */
  export function IsSystemProp(target: object, property: string | symbol) {
    Reflect.defineMetadata(IsSystemPropKey, true, target, property)
  }

  /**
   * Value needs to be filled in in order to save the BO
   */
  export function Mandatory(target: object, property: string | symbol) {
    Reflect.defineMetadata(MandatoryKey, true, target, property)
  }

  /**
   * Cannot be repeated from another BO having the same value
   */
  export function Unique(target: object, property: string | symbol) {
    Reflect.defineMetadata(UniqueKey, true, target, property)
  }

  /**
   * Cannot be repeated from another BO having the same value along with another UniqueUnion Property
   */
  export function UniqueUnion(target: object, property: string | symbol) {
    Reflect.defineMetadata(UniqueUnionKey, true, target, property)
  }

  /**
   * Will be gnored when building INSERT SQL commands
   */
  export function IsNonInsertable(target: object, property: string | symbol) {
    Reflect.defineMetadata(IsNonInsertableKey, true, target, property)
  }

  /**
   * Will be gnored when building UPDATE SQL commands
   */
  export function IsNonUpdatable(target: object, property: string | symbol) {
    Reflect.defineMetadata(IsNonUpdatableKey, true, target, property)
  }

  /**
   * The default Property to Order by in case an OrderBy parameter is not passed
   */
  export function DefaultOrderBy(target: object, property: string | symbol) {
    Reflect.defineMetadata(DefaultOrderByKey, true, target, property)
  }

  /**
   * Not taken in consideration for building SQL commands
   */
  export function IsVirtual(target: object, property: string | symbol) {
    Reflect.defineMetadata(IsVirtualKey, true, target, property)
  }

  /**
   * Just so we find out classes that may contain SystemLocked bo's
   */
  export function MakesClassSysLockable(target: object, property: string | symbol) {
    Reflect.defineMetadata(MakesClassSysLockableKey, true, target, property)
  }

  /**
   * In order to set a default value if empty when building INSERT SQL commands
   */
  export function HasInsertableDefault(target: object, property: string | symbol) {
    Reflect.defineMetadata(HasInsertableDefaultKey, true, target, property)
  }
}

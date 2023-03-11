
import {
  IBaseBo,
  IBaseBoFactory,
  ISqlCol,
  MyAsyncGenerator,
  OrderBy,
  Page,
  QryClause,
} from "."

export interface IBaseDao{
  setOrderBy(orderBy: OrderBy): this
  setPaging(page: Page): this
  getDynProps<IBo extends IBaseBo>(factory: IBaseBoFactory<IBo>): Promise<IBaseBo[]|Error>
  GetNewGuid(factory: IBaseBoFactory): Promise<number|Error>
  GetIds<IBo extends IBaseBo>(factory: IBaseBoFactory<IBo>, qry: QryClause): Promise<number[]|Error>
  Count<IBo extends IBaseBo>(factory: IBaseBoFactory<IBo>, qry?: QryClause): Promise<number|Error>
  Get<IBo extends IBaseBo>(id: number, factory: IBaseBoFactory<IBo>, columns?: ISqlCol[]): Promise<IBo | null>
  Create<IBo extends IBaseBo>(bo: IBo): Promise<IBo|Error>
  Update(bo: IBaseBo, avoidSystemLocked?: boolean): Promise<boolean|Error>
  Query<IBo extends IBaseBo>(qry: QryClause, factory: IBaseBoFactory<IBo>, columns?: ISqlCol[]): Promise<IBo[]|Error>
  Delete(id: number, factory: IBaseBoFactory, avoidSystemLocked?: boolean): Promise<boolean|Error>
  DeleteQuery(qry: QryClause, factory: IBaseBoFactory, avoidSystemLocked?: boolean): Promise<boolean|Error>
  List<IBo extends IBaseBo>(factory: IBaseBoFactory<IBo>, columns?: ISqlCol[]): Promise<IBo[]|Error>
  StreamList<IBo extends IBaseBo>(factory: IBaseBoFactory<IBo>, bufferSize?: number, columns?: ISqlCol[]): MyAsyncGenerator<IBo[]>
  StreamQuery<IBo extends IBaseBo>(qry: QryClause, factory: IBaseBoFactory<IBo>, bufferSize?: number, columns?: ISqlCol[]): MyAsyncGenerator<IBo[]>
  StreamGetIds<IBo extends IBaseBo>(qry: QryClause, factory: IBaseBoFactory<IBo>, bufferSize?: number): MyAsyncGenerator<number[]>
}
export default IBaseDao

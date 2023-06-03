import { SelectType } from "./IQueryResult";

interface IObjects {
  getTables(): Promise<SelectType>;
  getColumns(table: string): Promise<SelectType>;
}

export default IObjects;

import { SelectType } from "./IQueryResult";

interface IObjects {
  getTables(schema?: string): Promise<SelectType>;
  getColumns(table: string): Promise<SelectType>;
}

export default IObjects;

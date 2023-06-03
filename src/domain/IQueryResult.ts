import IColumn from "./IColumn";

interface Base {
  type: string;
}

export interface SelectType extends Base {
  rows: any[];
  columns: IColumn[];
  isSelect: true;
}

export interface MutationsType extends Base {
  completed: boolean;
  affectedRows: number;
  isSelect: false;
}

type IQueryResult = SelectType | MutationsType;

export default IQueryResult;

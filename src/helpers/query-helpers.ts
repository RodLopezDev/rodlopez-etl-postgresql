import { QueryResult } from "pg";

import IColumn from "../domain/IColumn";
import PgException from "../domain/PgException";

import { QueryType } from "../constants/query-type";
import SupportedColumns from "../constants/engine-columns";
import { NOT_SUPPORTED_COLUMN } from "../constants/errors";

export const QueryResultType = (queryResult: QueryResult<any>): QueryType => {
  const Map: Record<string, QueryType> = {
    SELECT: QueryType.SELECT,
    INSERT: QueryType.INSERT,
    UPDATE: QueryType.UPDATE,
    DELETE: QueryType.DELETE,
    CREATE: QueryType.CREATE,
    DROP: QueryType.DROP,
  };

  const type = Map[queryResult.command];
  if (!!type) {
    return type;
  }

  return QueryType.UNKNOWN;
};

export const GetColumns = (queryResult: QueryResult<any>): IColumn[] => {
  const Columns = queryResult.fields.map((field): IColumn => {
    const { name, dataTypeID } = field;
    const colType = SupportedColumns.find((e) => e.id === dataTypeID);
    if (!colType) {
      throw new PgException(
        NOT_SUPPORTED_COLUMN,
        `column ${field.name} with type ${dataTypeID} not supported`,
        ""
      );
    }

    const { commonType, nativeType } = colType;

    return { name, commonType, nativeType };
  });
  return Columns;
};

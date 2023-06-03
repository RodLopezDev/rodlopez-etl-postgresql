import { QueryResult } from "pg";

import BaseConnection from "./BaseConnection";

import IConnection from "../domain/IConnection";
import PgException from "../domain/PgException";
import IQueryResult, {
  MutationsType,
  SelectType,
} from "../domain/IQueryResult";

import { QueryType, QueryTypeLabel } from "../constants/query-type";
import { QueryResultType, GetColumns } from "../helpers/query-helpers";
import { ERROR_NOT_CONNECTED, QUERY_NOT_PROCESSED } from "../constants/errors";

class PgConnection extends BaseConnection implements IConnection {
  async query(query: string): Promise<IQueryResult> {
    if (!this.poolClient) {
      throw new PgException(ERROR_NOT_CONNECTED, "", "");
    }

    let queryResult: QueryResult<any> | null = null;
    try {
      queryResult = await this.poolClient.query(query);
    } catch (e: any) {
      throw new PgException(QUERY_NOT_PROCESSED, e?.message, String(e));
    }
    if (!queryResult) {
      throw new PgException(QUERY_NOT_PROCESSED, "", "");
    }

    const queryResultType = QueryResultType(queryResult);
    const type =
      QueryTypeLabel[queryResultType] || QueryTypeLabel[QueryType.UNKNOWN];

    if (queryResultType === QueryType.SELECT) {
      const rows = queryResult.rows;
      const columns = GetColumns(queryResult);
      return { rows, columns, type, isSelect: true } as SelectType;
    }
    if (
      [QueryType.INSERT, QueryType.UPDATE, QueryType.DELETE].includes(
        queryResultType
      )
    ) {
      const affectedRows = queryResult?.rowCount || 0;
      const completed = affectedRows > 0;
      return {
        completed,
        affectedRows,
        type,
        isSelect: false,
      } as MutationsType;
    }
    if ([QueryType.CREATE, QueryType.DROP].includes(queryResultType)) {
      return {
        completed: true,
        affectedRows: 0,
        type,
        isSelect: false,
      } as MutationsType;
    }

    throw new PgException("", "", "");
  }
}

export default PgConnection;

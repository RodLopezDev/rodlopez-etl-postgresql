import PgConnection from "./PgConnection";

import IObjects from "../domain/IObjects";
import PgException from "../domain/PgException";
import { SelectType } from "../domain/IQueryResult";

import {
  BAD_FORMAT_QUERY,
  OBJECT_NOT_FOUND,
  ERROR_NOT_CONNECTED,
} from "../constants/errors";
import { getColumnsQuery, getTablesQuery } from "../constants/core-queries";

class PgObjects implements IObjects {
  constructor(private readonly pgConnection: PgConnection) {}

  async getTables(): Promise<SelectType> {
    const connected = await this.pgConnection.connect();
    if (!connected) {
      throw new PgException(ERROR_NOT_CONNECTED, "", "");
    }

    const result = await this.pgConnection.query(getTablesQuery());
    if (!result.isSelect) {
      throw new PgException(BAD_FORMAT_QUERY, "", "");
    }
    if (!result.rows.length) {
      throw new PgException(OBJECT_NOT_FOUND, "", "");
    }

    await this.pgConnection.disconnect();

    return result;
  }

  async getColumns(table: string) {
    const connected = await this.pgConnection.connect();
    if (!connected) {
      throw new PgException(ERROR_NOT_CONNECTED, "", "");
    }

    const result = await this.pgConnection.query(getColumnsQuery(table));
    if (!result.isSelect) {
      throw new PgException(BAD_FORMAT_QUERY, "", "");
    }
    if (!result.rows.length) {
      throw new PgException(OBJECT_NOT_FOUND, "", "");
    }

    await this.pgConnection.disconnect();

    return result;
  }
}

export default PgObjects;

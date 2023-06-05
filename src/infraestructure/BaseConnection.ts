import { Pool, PoolClient } from "pg";

import PgException from "../domain/PgException";
import IBaseConnection from "../domain/IBaseConnection";

import { ALREADY_CONNECTED, ERROR_NOT_CONNECTED } from "../constants/errors";

class BaseConnection implements IBaseConnection {
  protected client: Pool;
  protected poolClient: PoolClient | undefined;

  constructor(
    host: string,
    port: number,
    database: string,
    user: string,
    password: string
  ) {
    this.client = new Pool({
      host,
      port,
      database,
      user,
      password,
    });
  }

  async connect() {
    if (!!this.poolClient) {
      throw new PgException(ALREADY_CONNECTED, "", "");
    }

    this.poolClient = await this.client.connect();
    return true;
  }

  async disconnect() {
    if (!this.poolClient) {
      throw new PgException(ERROR_NOT_CONNECTED, "", "");
    }

    this.poolClient.release();
    return true;
  }

  async ping() {
    if (!!this.poolClient) {
      return true;
    }

    const connect = await this.connect();
    await this.disconnect();
    return connect;
  }
}

export default BaseConnection;

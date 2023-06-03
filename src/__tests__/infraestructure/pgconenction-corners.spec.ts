import PgConnection from "../../infraestructure/PgConnection";

import { ALREADY_CONNECTED, ERROR_NOT_CONNECTED } from "../../constants/errors";

const host = "localhost";
const port = 5432;
const database = "postgres";
const user = "postgres";
const password = "postgres";

describe("PgConnection", () => {
  test("should to fail, you need to connect before to use query", async () => {
    const connection = new PgConnection(host, port, database, user, password);

    try {
      await connection.query("");
    } catch (e: any) {
      expect(e?.message).toEqual(ERROR_NOT_CONNECTED);
    }
  });
  test("should to fail, you need to connect before to disconnect", async () => {
    const connection = new PgConnection(host, port, database, user, password);

    try {
      await connection.disconnect();
    } catch (e: any) {
      expect(e?.message).toEqual(ERROR_NOT_CONNECTED);
    }
  });
  test("should to fail, you cannot reconnect when you already connect", async () => {
    const connection = new PgConnection(host, port, database, user, password);

    try {
      await connection.connect();
      await connection.connect();
    } catch (e: any) {
      expect(e?.message).toEqual(ALREADY_CONNECTED);
    }
  });
});

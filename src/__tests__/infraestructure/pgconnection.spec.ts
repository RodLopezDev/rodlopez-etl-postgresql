import PgConnection from "../../infraestructure/PgConnection";
import { QueryType, QueryTypeLabel } from "../../constants/query-type";

const host = String(process.env.TEST_HOST);
const port = Number(process.env.TEST_PORT);
const database = String(process.env.TEST_DATABASE);
const user = String(process.env.TEST_USER);
const password = String(process.env.TEST_PASSPORT);

describe("PgConnection", () => {
  test("should to connect/diconnect with no problem", async () => {
    const connection = new PgConnection(host, port, database, user, password);
    const connected = await connection.connect();
    expect(connected).toBeTruthy();

    const disconnected = await connection.disconnect();
    expect(disconnected).toBeTruthy();
  });
  test("should to connect/diconnect with no problem", async () => {
    const connection = new PgConnection(host, port, database, user, password);
    const connected = await connection.connect();
    expect(connected).toBeTruthy();

    const query = await connection.query("SELECT NOW()");
    expect(query.type).toEqual(QueryTypeLabel[QueryType.SELECT]);
    expect(query.isSelect).toBeTruthy();

    if (query.isSelect) {
      expect(query.rows.length).toBe(1);
      expect(query.columns.length).toBe(1);
    }

    const disconnected = await connection.disconnect();
    expect(disconnected).toBeTruthy();
  });
});

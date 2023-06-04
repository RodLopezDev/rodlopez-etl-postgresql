import PgConnection from "../../infraestructure/PgConnection";
import { QueryType, QueryTypeLabel } from "../../constants/query-type";

const host = String(process.env.TEST_HOST);
const port = Number(process.env.TEST_PORT);
const database = String(process.env.TEST_DATABASE);
const user = String(process.env.TEST_USER);
const password = String(process.env.TEST_PASSPORT);

const connection = new PgConnection(host, port, database, user, password);

const updateKeyItem = 1;

describe("COMPLETE FLOW", () => {
  beforeAll(async () => {
    const connected = await connection.connect();
    expect(connected).toBeTruthy();
  });
  afterAll(async () => {
    const disconnected = await connection.disconnect();
    expect(disconnected).toBeTruthy();
  });
  test("should to create a temporal table", async () => {
    const firstQuery = await connection.query(`
      CREATE TABLE IF NOT EXISTS public.test_case_temporal_table
      (firstColInt INT, firstColStr VARCHAR(100), anotherCol INT)
    `);

    expect(firstQuery.isSelect).not.toBeTruthy();
    expect(firstQuery.type).toEqual(QueryTypeLabel[QueryType.CREATE]);

    if (!firstQuery.isSelect) {
      expect(firstQuery.affectedRows).toBe(0);
      expect(firstQuery.completed).toBeTruthy();
    }
  });
  test("should to insert data", async () => {
    const dataTemporal = [
      { firstColInt: updateKeyItem, firstColStr: "exaj2j23", anotherCol: 124 },
      { firstColInt: 8, firstColStr: "u3j3ngh", anotherCol: 1373 },
      { firstColInt: 6, firstColStr: "js9dfu", anotherCol: 865 },
    ];

    const insertResult = await connection.fill(
      "public",
      "test_case_temporal_table",
      dataTemporal
    );

    for (let i = 0; i < dataTemporal.length; i++) {
      const result = insertResult[i];

      expect(result.isSelect).not.toBeTruthy();
      expect(result.type).toEqual(QueryTypeLabel[QueryType.INSERT]);

      if (!result.isSelect) {
        expect(result.affectedRows).toBe(1);
        expect(result.completed).toBeTruthy();
      }
    }
  });
  test("should to update data", async () => {
    const updatedValueInt = 30;
    const updatedValueStr = "another=VALUE";

    const updateResult = await connection.query(`
      UPDATE public.test_case_temporal_table
      SET 
        firstcolstr='${updatedValueStr}', 
        anothercol=${updatedValueInt}
      WHERE firstcolint = ${updateKeyItem};
    `);

    expect(updateResult.isSelect).not.toBeTruthy();
    expect(updateResult.type).toEqual(QueryTypeLabel[QueryType.UPDATE]);

    if (!updateResult.isSelect) {
      expect(updateResult.completed).toBeTruthy();
      expect(updateResult.affectedRows > 0).toBeTruthy();
    }

    const checkResult = await connection.query(`
      SELECT * FROM public.test_case_temporal_table
      WHERE firstcolint = ${updateKeyItem};
    `);

    expect(checkResult.isSelect).toBeTruthy();
    expect(checkResult.type).toEqual(QueryTypeLabel[QueryType.SELECT]);

    if (!!checkResult.isSelect) {
      expect(checkResult.columns.length).toBe(3);
      expect(checkResult.rows.length).toBe(1);

      expect(checkResult.rows[0].firstcolint).toBe(updateKeyItem);
      expect(checkResult.rows[0].firstcolstr).toEqual(updatedValueStr);
      expect(checkResult.rows[0].anothercol).toBe(updatedValueInt);
    }
  });
  test("should to remove data", async () => {
    const updateResult = await connection.query(`
      DELETE FROM public.test_case_temporal_table
      WHERE firstcolint = ${updateKeyItem};
    `);

    expect(updateResult.isSelect).not.toBeTruthy();
    expect(updateResult.type).toEqual(QueryTypeLabel[QueryType.DELETE]);

    if (!updateResult.isSelect) {
      expect(updateResult.completed).toBeTruthy();
      expect(updateResult.affectedRows > 0).toBeTruthy();
    }

    const checkResult = await connection.query(`
      SELECT * FROM public.test_case_temporal_table
      WHERE firstcolint = ${updateKeyItem};
    `);

    expect(checkResult.isSelect).toBeTruthy();
    expect(checkResult.type).toEqual(QueryTypeLabel[QueryType.SELECT]);

    if (!!checkResult.isSelect) {
      expect(checkResult.columns.length).toBe(3);
      expect(checkResult.rows.length).toBe(0);
    }
  });
  test("should to update data", async () => {
    const updateResult = await connection.query(`
      DROP TABLE IF EXISTS public.test_case_temporal_table
    `);

    expect(updateResult.isSelect).not.toBeTruthy();
    expect(updateResult.type).toEqual(QueryTypeLabel[QueryType.DROP]);

    if (!updateResult.isSelect) {
      expect(updateResult.completed).toBeTruthy();
      expect(updateResult.affectedRows).toBe(0);
    }
  });
});

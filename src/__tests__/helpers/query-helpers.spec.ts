import { QueryResult, FieldDef } from "pg";
import { QueryType } from "../../constants/query-type";
import { GetColumns, QueryResultType } from "../../helpers/query-helpers";
import { NOT_SUPPORTED_COLUMN } from "../../constants/errors";
import SupportedColumns from "../../constants/engine-columns";

describe("Helper functions", () => {
  test("should to return correct type - QueryResultType", () => {
    const baseObject: QueryResult = {
      command: "",
      fields: [],
      oid: 0,
      rowCount: 2,
      rows: [],
    };

    const typeSelect = QueryResultType({
      ...baseObject,
      command: "SELECT",
    });
    const typeInsert = QueryResultType({
      ...baseObject,
      command: "INSERT",
    });
    const typeUpdate = QueryResultType({
      ...baseObject,
      command: "UPDATE",
    });
    const typeDelete = QueryResultType({
      ...baseObject,
      command: "DELETE",
    });
    const typeCreate = QueryResultType({
      ...baseObject,
      command: "CREATE",
    });
    const typeDrop = QueryResultType({
      ...baseObject,
      command: "DROP",
    });
    const typeUnkown = QueryResultType({
      ...baseObject,
      command: "XXX",
    });

    expect(typeSelect).toEqual(QueryType.SELECT);
    expect(typeCreate).toEqual(QueryType.CREATE);
    expect(typeDrop).toEqual(QueryType.DROP);
    expect(typeInsert).toEqual(QueryType.INSERT);
    expect(typeUpdate).toEqual(QueryType.UPDATE);
    expect(typeDelete).toEqual(QueryType.DELETE);
    expect(typeUnkown).toEqual(QueryType.UNKNOWN);
  });

  test("should return formatted column - GetColumns", () => {
    const columnPg: FieldDef = {
      columnID: 1,
      dataTypeID: SupportedColumns[0].id, //Not supported type
      dataTypeModifier: 1,
      dataTypeSize: 1,
      format: "",
      name: "ExampleColumn",
      tableID: 1,
    };
    const baseObject: QueryResult = {
      command: "",
      fields: [columnPg],
      oid: 0,
      rowCount: 2,
      rows: [],
    };

    const result = GetColumns(baseObject);
    expect(result.length).toBe(1);

    expect(result[0].name).toEqual(columnPg.name);
    expect(result[0].commonType).toEqual(SupportedColumns[0].commonType);
    expect(result[0].nativeType).toEqual(SupportedColumns[0].nativeType);
  });

  test("should to fail, not supported column - GetColumns", () => {
    const columnPg: FieldDef = {
      columnID: 1,
      dataTypeID: 111111111, //Not supported type
      dataTypeModifier: 1,
      dataTypeSize: 1,
      format: "",
      name: "",
      tableID: 1,
    };
    const baseObject: QueryResult = {
      command: "",
      fields: [columnPg],
      oid: 0,
      rowCount: 2,
      rows: [],
    };

    try {
      GetColumns(baseObject);
    } catch (e: any) {
      expect(e?.message).toEqual(NOT_SUPPORTED_COLUMN);
    }
  });
});

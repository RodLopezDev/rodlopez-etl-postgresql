import CommonColumnType from "./common-columns";

interface ColType {
  id: number;
  nativeType: string;
  commonType: string;
}

// Source:
// SELECT oid, typname FROM pg_type
//1184
const SupportedColumns: ColType[] = [
  {
    id: 16,
    nativeType: "bool",
    commonType: CommonColumnType.BOOLEAN,
  },
  {
    id: 18,
    nativeType: "char",
    commonType: CommonColumnType.STRING,
  },
  {
    id: 19,
    nativeType: "name",
    commonType: CommonColumnType.STRING,
  },
  {
    id: 20,
    nativeType: "int8",
    commonType: CommonColumnType.INT,
  },
  {
    id: 21,
    nativeType: "int2",
    commonType: CommonColumnType.INT,
  },
  {
    id: 23,
    nativeType: "int4",
    commonType: CommonColumnType.INT,
  },
  {
    id: 25,
    nativeType: "text",
    commonType: CommonColumnType.STRING,
  },
  {
    id: 26,
    nativeType: "oid",
    commonType: CommonColumnType.INT,
  },
  {
    id: 700,
    nativeType: "float4",
    commonType: CommonColumnType.DOUBLE,
  },
  {
    id: 701,
    nativeType: "float8",
    commonType: CommonColumnType.DOUBLE,
  },
  {
    id: 1043,
    nativeType: "varchar",
    commonType: CommonColumnType.STRING,
  },
  {
    id: 1082,
    nativeType: "date",
    commonType: CommonColumnType.STRING,
  },
  {
    id: 1083,
    nativeType: "time",
    commonType: CommonColumnType.STRING,
  },
  {
    id: 1114,
    nativeType: "timestamp",
    commonType: CommonColumnType.TIMESTAMP,
  },
  {
    id: 1184,
    nativeType: "timestamptz",
    commonType: CommonColumnType.TIMESTAMP,
  },
];

export default SupportedColumns;

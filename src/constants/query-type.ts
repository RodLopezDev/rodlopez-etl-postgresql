export enum QueryType {
  SELECT = 1, // Query
  INSERT, // Insert rows
  UPDATE, // Update rows
  DELETE, // Update rows
  CREATE, // Create tables
  DROP, // Drop tables
  UNKNOWN, // Not tracked
}

export const QueryTypeLabel: Record<QueryType, string> = {
  [QueryType.SELECT]: "SELECT",
  [QueryType.INSERT]: "INSERT",
  [QueryType.UPDATE]: "UPDATE",
  [QueryType.DELETE]: "DELETE",
  [QueryType.CREATE]: "CREATE",
  [QueryType.DROP]: "DROP",
  [QueryType.UNKNOWN]: "UNKNOWN",
};

export const MapOfQyeryTypes: Record<string, QueryType> = {
  SELECT: QueryType.SELECT,
  INSERT: QueryType.INSERT,
  UPDATE: QueryType.UPDATE,
  DELETE: QueryType.DELETE,
  CREATE: QueryType.CREATE,
  DROP: QueryType.DROP,
};

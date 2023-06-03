import IQueryResult from "./IQueryResult";

interface IConnection {
  query(query: string): Promise<IQueryResult>;
}

export default IConnection;

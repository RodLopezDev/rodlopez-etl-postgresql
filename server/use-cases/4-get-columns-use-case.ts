import PgConnection from "../../src/infraestructure/PgConnection";
import PgObjects from "../../src/infraestructure/PgObjects";

const GetColumnsUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string,
  table: string
) => {
  const connection = new PgConnection(host, port, database, user, password);
  const pgObjects = new PgObjects(connection);

  return await pgObjects.getColumns(table);
};

export default GetColumnsUseCase;

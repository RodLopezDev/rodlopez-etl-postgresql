import PgConnection from "../../src/infraestructure/PgConnection";
import PgObjects from "../../src/infraestructure/PgObjects";

const GetTablesUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string
) => {
  const connection = new PgConnection(host, port, database, user, password);
  const pgObjects = new PgObjects(connection);

  return await pgObjects.getTables();
};

export default GetTablesUseCase;

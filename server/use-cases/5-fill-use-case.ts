import PgConnection from "../../src/infraestructure/PgConnection";
import PgObjects from "../../src/infraestructure/PgObjects";

const FillUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string,
  schema: string,
  table: string,
  data: any
) => {
  const connection = new PgConnection(host, port, database, user, password);

  const connencted = await connection.connect();
  if (!connencted) {
    return null;
  }

  const result = await connection.fill(schema, table, data);

  await connection.disconnect();

  return result;
};

export default FillUseCase;

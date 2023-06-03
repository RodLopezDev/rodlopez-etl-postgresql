import PgConnection from "../../src/infraestructure/PgConnection";

const QueryUseCase = async (
  host: string,
  port: number,
  database: string,
  user: string,
  password: string,
  query: string
) => {
  const connection = new PgConnection(host, port, database, user, password);
  
  const connencted = await connection.connect();
  if (!connencted) {
    return null;
  }

  const queryResult = await connection.query(query);

  await connection.disconnect();

  return queryResult;
};

export default QueryUseCase;

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Client } from 'pg';
import { createConnection } from 'mysql2/promise';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // listar tablas PG
  @Get('/getPingPostgres/:host/:port/:database/:user/:password')
  async getPing(
    @Param('host') host: string,
    @Param('port', ParseIntPipe) port: number,
    @Param('database') database: string,
    @Param('user') user: string,
    @Param('password') password: string,
  ) {
    const client = new Client({
      host,
      port,
      database,
      user,
      password,
    });
    try {
      await client.connect();
      const res = await client.query('SELECT NOW()');
      //await client.ping();
      console.log(
        `Connected to PostgreSQL server at ${client.host}:${client.port}, database '${client.database}'`,
      );
      console.log(`Server current time: ${res.rows[0].now}`);
      return 'Connection is active and healthy.';
    } catch (error) {
      console.log(error);
      return JSON.stringify(error);
    } finally {
      await client.end();
    }
  }
  // listar tablas
  @Get('/getTables')
  async getTables() {
    try {
      const client = new Client({
        user: 'dspace',
        host: '181.176.163.74',
        database: 'dspace',
        password: '.dspace-',
        port: 5432,
      });
      await client.connect();
      // console.log('Conexion ====ª: ' + sql);
      const result = await client.query(`SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name`);
      // console.table(result.rows);
      await client.end();

      // Insert con objeto mach con columna

      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }
  //Listar Rows de tabla
  @Get('/getRowsTable/:table')
  async getRegistersTable(@Param('table') table: string) {
    try {
      const client = new Client({
        user: 'dspace',
        host: '181.176.163.74',
        database: 'dspace',
        password: '.dspace-',
        port: 5432,
      });
      await client.connect();
      const result = await client.query(`SELECT * FROM ${table}`);
      console.table(result.rows);
      await client.end();
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }
  // Listar Columns de Tabla
  @Get('/getColumnsTable/:table')
  async getColumnsTable(@Param('table') table: string) {
    try {
      const client = new Client({
        user: 'dspace',
        host: '181.176.163.74',
        database: 'dspace',
        password: '.dspace-',
        port: 5432,
      });
      await client.connect();
      const result = await client.query(`
          SELECT column_name, data_type, is_nullable, column_default,
                character_maximum_length, numeric_precision, numeric_scale
          FROM information_schema.columns
          WHERE table_name = '${table}'
          ORDER BY ordinal_position
        `);
      const columns = result.rows.map((row) => ({
        name: row.column_name,
        type: pgFormatType(
          row.data_type,
          row.numeric_precision,
          row.numeric_scale,
          row.character_maximum_length,
        ),
        nullable: row.is_nullable === 'YES',
        default: row.column_default,
      }));
      // console.table(result.rows);
      await client.end();
      return columns;
    } catch (error) {
      console.log(error);
    }
  }

  // listar tablas MariaDB
  @Get('/getPingMySql/:host/:port/:database/:user/:password')
  async getPingMysql(
    @Param('host') host: string,
    @Param('port', ParseIntPipe) port: number,
    @Param('database') database: string,
    @Param('user') user: string,
    @Param('password') password: string,
  ) {
    // const connection = await createConnection({}
    //   `mysql://${user}:${password}@${host}/${database}`,
    // );
    const connection = await createConnection({
      host,
      port,
      database,
      user,
      password,
    });
    try {
      await connection.ping();
      console.log('Ping exitoso a la base de datos');

      // Obtener las tablas de la base de datos
      const [rows, fields] = await connection.execute('SHOW TABLES');

      const result = (rows as Array<any>).map((element) => {
        const key = Object.keys(element);
        return element?.[key?.[0]] || '';
      });

      console.log(result);
      //rows[0].forEach((row) => console.log(row[fields[0].name]));
      return 'Connection is active and healthy.';
    } catch (error) {
      console.log(error);
      return JSON.stringify(error);
    } finally {
      // await connection.close();
    }
  }
}

function pgFormatType(dataType, precision, scale, maxLength) {
  if (dataType === 'numeric') {
    return `numeric(${precision},${scale})`;
  } else if (dataType === 'character varying') {
    return `varchar(${maxLength})`;
  } else {
    return dataType;
  }
}

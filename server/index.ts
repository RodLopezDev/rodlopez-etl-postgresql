import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import { getNumber, getString } from "./utils";
import PgException from "../src/domain/PgException";

import PingUseCase from "./use-cases/1-ping-use-case";
import QueryUseCase from "./use-cases/2-query-use-case";
import GetTablesUseCase from "./use-cases/3-get-tables-use-case";
import GetColumnsUseCase from "./use-cases/4-get-columns-use-case";
import FillUseCase from "./use-cases/5-fill-use-case";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.post("/ping", async (req: Request, res: Response) => {
  try {
    const DB_HOST = getString(req.body, "host");
    const DB_PORT = getNumber(req.body, "port" || 0);
    const DB_NAME = getString(req.body, "database");
    const DB_USER = getString(req.body, "user");
    const DB_PASSWORD = getString(req.body, "password");

    const result = await PingUseCase(
      DB_HOST,
      DB_PORT,
      DB_NAME,
      DB_USER,
      DB_PASSWORD
    );
    return res.json(result);
  } catch (e: any) {
    if (e instanceof PgException) {
      return res.json({ error: e?.message, detail: e?.detail });
    }
    return res.json({ error: e?.message });
  }
});

app.post("/query", async (req: Request, res: Response) => {
  try {
    const DB_HOST = getString(req.body, "host");
    const DB_PORT = getNumber(req.body, "port" || 0);
    const DB_NAME = getString(req.body, "database");
    const DB_USER = getString(req.body, "user");
    const DB_PASSWORD = getString(req.body, "password");
    const query = getString(req.body, "query");

    const result = await QueryUseCase(
      DB_HOST,
      DB_PORT,
      DB_NAME,
      DB_USER,
      DB_PASSWORD,
      query
    );
    return res.json(result);
  } catch (e: any) {
    if (e instanceof PgException) {
      return res.status(200).json({ error: e?.message, ...e });
    }

    return res.status(500).json({ error: e?.message, ...e });
  }
});

app.post("/tables", async (req: Request, res: Response) => {
  try {
    const DB_HOST = getString(req.body, "host");
    const DB_PORT = getNumber(req.body, "port" || 0);
    const DB_NAME = getString(req.body, "database");
    const DB_USER = getString(req.body, "user");
    const DB_PASSWORD = getString(req.body, "password");

    const result = await GetTablesUseCase(
      DB_HOST,
      DB_PORT,
      DB_NAME,
      DB_USER,
      DB_PASSWORD
    );
    return res.json(result);
  } catch (e: any) {
    if (e instanceof PgException) {
      return res.status(200).json({ error: e?.message, ...e });
    }

    return res.status(500).json({ error: e?.message, ...e });
  }
});

app.post("/columns", async (req: Request, res: Response) => {
  try {
    const DB_HOST = getString(req.body, "host");
    const DB_PORT = getNumber(req.body, "port" || 0);
    const DB_NAME = getString(req.body, "database");
    const DB_USER = getString(req.body, "user");
    const DB_PASSWORD = getString(req.body, "password");
    const DB_TABLE = getString(req.body, "table");

    const result = await GetColumnsUseCase(
      DB_HOST,
      DB_PORT,
      DB_NAME,
      DB_USER,
      DB_PASSWORD,
      DB_TABLE
    );
    return res.json(result);
  } catch (e: any) {
    if (e instanceof PgException) {
      return res.status(200).json({ error: e?.message, ...e });
    }

    return res.status(500).json({ error: e?.message, ...e });
  }
});

app.post("/fill", async (req: Request, res: Response) => {
  try {
    const DB_HOST = getString(req.body, "host");
    const DB_PORT = getNumber(req.body, "port" || 0);
    const DB_NAME = getString(req.body, "database");
    const DB_USER = getString(req.body, "user");
    const DB_PASSWORD = getString(req.body, "password");
    const DB_SCHEMA = getString(req.body, "schema");
    const DB_TABLE = getString(req.body, "table");
    const DB_DATA = req.body?.data;

    const result = await FillUseCase(
      DB_HOST,
      DB_PORT,
      DB_NAME,
      DB_USER,
      DB_PASSWORD,
      DB_SCHEMA,
      DB_TABLE,
      DB_DATA
    );
    return res.json(result);
  } catch (e: any) {
    if (e instanceof PgException) {
      return res.status(200).json({ error: e?.message, ...e });
    }

    return res.status(500).json({ error: e?.message, ...e });
  }
});

app.listen(port, () => {});

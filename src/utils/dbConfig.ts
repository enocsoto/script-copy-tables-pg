import * as dotenv from 'dotenv';
import { DBConfig } from "../interface/DbConfig";
dotenv.config();

export const dbConfig: DBConfig = {
  dev:{
  host: process.env.PGHOST ||undefined,
  port: parseInt(process.env.PGPORT || '0000', 10) || undefined,
  database: process.env.PGDATABASE  || undefined,
  user: process.env.PGUSER || undefined,
  password: process.env.PGPASSWORD || undefined,
  }
};

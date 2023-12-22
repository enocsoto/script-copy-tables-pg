import * as path from 'path';
import { Client } from 'pg';

import { exportTablesToCSV } from './utils/exportTablesToCSV';
import { dbConfig } from './utils/dbConfig';

const main = async () => {
  const client = new Client(dbConfig.dev);

  try {
    await client.connect();
    const tableNamesPath = path.join(__dirname, '..', 'tablesName.txt');
    await exportTablesToCSV(client, tableNamesPath);
  } catch (error) {
    console.error('Error en la conexion: ', error);
  } finally {
    if (client && client.end) {
      await client.end();
    }
  }
};

main();

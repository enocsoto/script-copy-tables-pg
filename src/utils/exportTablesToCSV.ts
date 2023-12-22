import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

export const exportTablesToCSV = async (client: Client, tableNamesPath: string) => {
  try {
    await client.query('BEGIN');

    const tablesLine = fs.readFileSync(tableNamesPath, 'utf-8').trim(); 
    const tables:string[] = tablesLine.split(' ');
    const backupFolder = path.join(__dirname, '..', 'backup');

    for (const tableName of tables) {
      const query = `COPY ${tableName} TO '${tableName}.csv' WITH CSV HEADER;`;
      await client.query(query);
      const filePath = path.join(backupFolder, `${tableName}.csv`);
      const fileExists = fs.existsSync(filePath);

      if (fileExists) {
        console.log(`Exportado ${tableName}.csv`);
      } else {
        throw new Error(`Error al exportar ${tableName}`);
      }
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
};

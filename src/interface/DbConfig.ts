export interface DBConfig {
  dev:{
    user: string | undefined;
    host: string | undefined;
    database: string | undefined;
    password: string | undefined;
    port: number | undefined;
  }
}
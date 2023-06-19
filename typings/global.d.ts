import { DataSource } from 'typeorm';

declare global {
  namespace NodeJS {
    interface Global {
      connection: DataSource;
    }
  }
}
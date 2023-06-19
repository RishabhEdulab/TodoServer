import { DataSource } from "typeorm";
import { Employee } from "../entities/Employee";


export const jestDataSource = new DataSource({
  type: "mongodb",
  url: "mongodb://0.0.0.0:27017/",
  database: "jestdatabase",

  synchronize: false,
  logging: false,
  entities: [Employee],
  migrations: [],
  subscribers: [],
  
});

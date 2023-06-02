import { DataSource } from "typeorm";
import { Employee } from "../entities/Employee";
import dotenv from "dotenv";
import { Register } from "../entities/Register";
dotenv.config();
const port = process.env.MONGODB_PORT;
if (!port) throw new Error(`port is undefined ${port}`);
const host = process.env.HOST;
if (!host) throw new Error(`port is undefined ${host}`);
const database = process.env.DATABASE;
if (!database) throw new Error(`port is undefined ${database}`);
const AppDataSource = new DataSource({
  type: "mongodb",
  port: Number(port),
  host: host,
  database: database,

  useUnifiedTopology: true,
  synchronize: true,
  logging: true,

  entities: [Employee,Register],
});

export default AppDataSource
import { DataSource } from "typeorm";
import { Employee } from "../entities/Employee";
import dotenv from "dotenv";
import { Register } from "../entities/Register";
dotenv.config();
const port = process.env.MONGODB_PORT;
if (!port) throw new Error(`port is undefined ${port}`);
const host = process.env.HOST;
if (!host) throw new Error(`port is undefined ${host}`);
var db=process.env.DATABASE;
if (!db) throw new Error(`port is undefined ${db}`);
var updateDatabase:string=db;
var updatePort:string=port;
var updateHost:string=host;
export const database:any = (param:string,testPort:string,testHost:string)=>{
 
  updateDatabase=param;
   updatePort=testPort;
 updateHost=testHost;
  console.log("paramintytrg",updateDatabase,updatePort,updateHost);
  return param ?? process.env.DATABASE;
}


export const AppDataSource = new DataSource({
  type: "mongodb",
  port: Number(updatePort),
  host: updateHost,
  database: updateDatabase,

  useUnifiedTopology: true,
  synchronize: true,
  logging: true,

   entities: [Employee,Register],
});

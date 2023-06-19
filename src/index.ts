import express, { Response, Request, Application } from "express";
import dotenv from "dotenv";
import { resolve } from "path";
import { AppDataSource, database } from "./auth/DataSource";
import router from "./routes/EmployeeRoutes";
import Authrouter from "./routes/Auth";
import { string } from "joi";
import { jestDataSource } from "./auth/jest-setup";

let jestData = "";
export const testInitialize = (param: string) => {
  jestData = param;
  return param;
};
AppDataSource.initialize()
  .then(() => {
    console.log("original database is connected");

    if (jestData) {
      console.log("orginal database", jestData);
      //destroy original connection
      AppDataSource.destroy()
        .then(() => console.log("original database is dicoonect"))
        .catch(() => console.log("original something went wrong"));
      //close destroy original connection
   
    }
  })
  .catch((error) => console.log(error));

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/Employees", router);
app.use("/user", Authrouter);
app.get("/Get", (req: Request, res: Response) => {
  res.status(200).json({ message: "hello world" });
});
//close mock routes

//close mock routes
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;

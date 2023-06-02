import express, { Response, Request, Application } from "express";
import dotenv from "dotenv";
import { resolve } from "path";
import AppDataSource from "./config/DataSource";
import router from "./routes/EmployeeRoutes"
import Authrouter from "./routes/Auth";
AppDataSource.initialize()
  .then(() => console.log("Employee table is created"))
  .catch((error) => console.log(error));
const app: Application = express();
const port = process.env.PORT || 3000;
console.log("EXPRESS typescript");
app.use(express.json());
app.use("/Employees",router)
app.use("/user",Authrouter)
app.get("/Get", (req: Request, res: Response) => {
    res.send("todo list example");
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

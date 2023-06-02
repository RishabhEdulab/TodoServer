import express, { Response, Request } from "express";
import { Register } from "../entities/Register";
import AppDataSource from "../auth/DataSource";
import { ObjectId } from "mongodb";
import cors from "cors";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})
const Authrouter = express.Router();
Authrouter.use(cors());

const registerRepository = AppDataSource.getRepository(Register);

Authrouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, age, gender, city, address } = req.body;
    if (!name || !email || !password || !age || !gender || !city || !address) {
      return res.status(200).send({ status: "failed", message: "null" });
    }
    const userRegistration = new Register();
    userRegistration.name = name;
    userRegistration.email = email;
    userRegistration.password = password;
    userRegistration.age = Number(age);
    userRegistration.gender = gender;
    userRegistration.city = city;
    userRegistration.address = address;
    await registerRepository.save(userRegistration);
    res.status(201).send({ status: "success", message: "inserted" });
  } catch (error) {
    console.log(error);
  }
});

Authrouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).send({ status: "failed", message: "null" });
    }

    const validUser =await registerRepository.findOneBy({
      email: email,
      password: password,
    });
    console.log("valid user", validUser);
    
    if (!validUser) {
      return res.status(401).send({ status: "failed", message: "invalid" });
    }
    jwt.sign({ validUser }, String(process.env.JWTKEY), { expiresIn: "2h" }, (err, token) => {
        if (err) {
          return res.send({
            status: "failed",
            message: "Something went wrong Please try again after Sometime",
          });
        }
        res.send({
          httpstatus: 200,
          status: "success",
          message: "Login",
          auth: token,
        });
      });
  
  } catch (error) {
    console.log(error);
  }
});
export default Authrouter;

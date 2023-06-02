import express, { Response, Request,NextFunction } from "express";
import { Employee } from "../entities/Employee";
import AppDataSource from "../config/DataSource";
import { ObjectId } from "mongodb";
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})
const router = express.Router();
router.use(cors());
const employeeRepsitory = AppDataSource.getRepository(Employee);
const verifyToken = (req: Request, resp: Response, next: NextFunction) => {

  var AuthToken = req.headers["authorization"];

  if (!AuthToken) {
    return resp
      .status(401)
      .send({ status: "failed", message: "token is null" });
  }
  const token = AuthToken.split(" ")[1];
  console.log("tokentoken",token);
  
  
  jwt.verify(token, String(process.env.JWTKEY), (err, valid) => {
    
    if (err) {
      console.log("error",token);
      return resp
        .status(401)
        .send({ status: "failed", message: "Please Provide a valid token" });
    }
    console.log("call next");
    next();
  });
};

router.get("/Get",verifyToken, async (req: Request, res: Response) => {
  const id=req.query.id;
  const action = req.query.action
  console.log(id,action);
  
  if(!id && !action){
    console.log(`id and action ${req.query.id} ${req.query.action}`);
    
  }
  if(id && action){
   
    const objectId = new ObjectId(String(id));
    const getData = await employeeRepsitory.findOne({where:{_id: objectId}});
    console.log(getData);
    
  res.status(200).json(getData);
  }else{
    const getData = await employeeRepsitory.find();

    res.status(200).json(getData);
  }
 
});
router.post("/Insert", async (req: Request, resp: Response) => {
  try {
    const { name, email, password, age, gender } = req.body;

    const AlredayExistss = await employeeRepsitory.findOne({
      where: { email: email },
    });
    if (AlredayExistss) {
      return resp
        .status(200)
        .send({ status: "failed", message: "email already exists" });
    }
    const emp = new Employee();
    emp.name = name;
    emp.email = email;
    emp.password = password;
    emp.age = age;
    emp.gender = gender;
    await employeeRepsitory.save(emp);
    resp
      .status(201)
      .send({ status: "success", message: "Data Inserted Successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/Update", async (req: Request, resp: Response) => {
  try {
    
    const { id, name, email, password, age, gender } = req.body;

    if (!id ||  !name || !password || !email || !age || !gender) {
      return resp
        .status(200)
        .send({ status: "failed", message: "Data is Null" });
    }
    const objectId = new ObjectId(String(id));
    const employeeUpdate = await employeeRepsitory.findOneBy({ _id: objectId });
    console.log(employeeUpdate);
    if (!employeeUpdate) {
      
      
      return resp
        .status(404)
        .send({ status: "failed", message: "User Not Found" });
    }
    employeeUpdate.name = name;
    employeeUpdate.email = email;
    employeeUpdate.password = password;
    employeeUpdate.age = age;
    employeeUpdate.gender = gender;
    employeeRepsitory.save(employeeUpdate);
    resp.status(200).send({ status: "success", message: "Data Is Updated" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/Delete",async (req,res)=>{
try{
  const id=req.query.id ??0;
  console.log("delete id",id);
  
  const objectId = new ObjectId(String(id));
  const employeeRemove=await employeeRepsitory.findOneBy({_id:objectId})
  if(!employeeRemove){
    return res.status(404).send({ status: "failed", message: "user not found" });
  }
  await employeeRepsitory.remove(employeeRemove)
  res.status(200).send({ status: "success", message: "Data is Deleted" });
}catch(error)
{
console.log(error);
}
})


export default router;

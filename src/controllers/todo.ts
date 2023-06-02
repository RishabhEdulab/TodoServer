import express, { Response, Request, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { Employee } from "../entities/Employee";
import AppDataSource from "../auth/DataSource";
export default class TodoController {
  static getTodos = async (req: Request, res: Response) => {
    const employeeRepsitory = AppDataSource.getRepository(Employee);
    const id = req.query.id;
    const action = req.query.action;
    console.log(id, action);

    if (!id && !action) {
      console.log(`id and action ${req.query.id} ${req.query.action}`);
    }
    if (id && action) {
      const objectId = new ObjectId(String(id));
      const getData = await employeeRepsitory.findOne({
        where: { _id: objectId },
      });
      console.log(getData);

      res.status(200).json(getData);
    } else {
      const getData = await employeeRepsitory.find();

      res.status(200).json(getData);
    }
  };

  static postTodos = async (req: Request, resp: Response) => {
    const employeeRepsitory = AppDataSource.getRepository(Employee);
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
  };
  static updateTodo = async (req: Request, resp: Response) => {
    try {
      const employeeRepsitory = AppDataSource.getRepository(Employee);
      const { id, name, email, password, age, gender } = req.body;

      if (!id || !name || !password || !email || !age || !gender) {
        return resp
          .status(200)
          .send({ status: "failed", message: "Data is Null" });
      }
      const objectId = new ObjectId(String(id));
      const employeeUpdate = await employeeRepsitory.findOneBy({
        _id: objectId,
      });
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
  };

  static deleteTodo=async (req:Request,res:Response)=>{
    try{
        const employeeRepsitory = AppDataSource.getRepository(Employee);
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
    }
}

import express, { Response, Request,NextFunction } from "express";
import { Employee } from "../entities/Employee";
import {AppDataSource,database} from "../auth/DataSource";
import { ObjectId } from "mongodb";
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import TodoController from "../controllers/todo";
import { verifyToken } from "../middleware/verify";


dotenv.config({path:'../.env'})


const router = express.Router();
router.use(cors());

const employeeRepsitory = AppDataSource.getRepository(Employee);


//verifyToken
router.get("/Get",TodoController.getTodos);

router.post("/Insert", TodoController.postTodos);

router.put("/Update", TodoController.updateTodo);

router.delete("/Delete",TodoController.deleteTodo)


export default router;

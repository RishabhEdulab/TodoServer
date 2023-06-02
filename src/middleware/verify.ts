import express, {Request, Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken'
export   const verifyToken = (req: Request, resp: Response, next: NextFunction) => {

    var AuthToken = req.headers["authorization"];
  
    if (!AuthToken) {
      return resp.status(401)
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
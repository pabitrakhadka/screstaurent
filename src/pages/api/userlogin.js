import prisma from "@/db/db.config";
import { userLoginSchema } from "./fieldValidate/index.js";
import {verifyPassword } from "./validate/hash";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
    try {
       if(req.method=='POST')
       {
        const {error,value}=userLoginSchema.validate(req.body);
        if(error)
        {
            return res.status(400).json({ error: error.details[0].message });
        }
        const {email,password}=req.body;
      const findUser =await prisma.user.findUnique({
        where:{
        user_email:email,
        }
      });
      if (!findUser || !verifyPassword(password,findUser.user_password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

        let token;
    // Check if the user has a token in the database
    if (!findUser.user_token) {
      // Generate a new token
      token = jwt.sign(
        { id: findUser.user_id, email: findUser.user_email },
        process.env.JWT_SECRET_KEY,
        
      );
      // Update user's token in the database
      await prisma.user.update({
        where: { user_id:findUser.user_id },
        data: { user_token:token },
      });
    } else {
      // Use the existing token
      token = findUser.user_token;
    }
      
    return res
    .status(200)
    .json({
      message: "Login successful",
      token: token,
      id: findUser.user_id,
      name: findUser.user_name,
      email: findUser.user_email,
    });
       }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Internal Server Error',error:error }) 
    }
}

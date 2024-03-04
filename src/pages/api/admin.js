import prisma from "@/db/db.config";
import { adminSchema } from './fieldValidate/index.js';
import { hashPassword, verifyPassword } from "./validate/hash.js";

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { error, value } = adminSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { name, email, phone, password } = value; // Destructure from 'value'

      const findAdmin = await prisma.admin.findUnique({
        where: { email: email }
      });
      if (findAdmin) {
        return res.status(400).json({ status: 400, message: "Email already taken. Please choose another Email." });
      }

      const addAdmin = await prisma.admin.create({
        data: {
          name: name,
          email: email,
          phone: phone, // Corrected property name
          password: hashPassword(password)
        },
      });

      return res.status(200).json({ status: 200, data: addAdmin, message: "Admin is Added successfully." });
    }
    else if (req.method === "GET") {
      try {
        const id = parseInt(req.query.id);
        if (id) {
          const data = await prisma.admin.findMany({
            where: { id: id }, // Corrected property name
            select: { 
              id:true,// Added 'select' for correct syntax
              name: true,
              email: true,
              phone:true
            }
          });
          return res.status(200).json({ status: 200, data: data });
        }
        const data = await prisma.admin.findMany({
          select: {
            id:true,
            name:true,
            email: true,
            phone:true
             
          }
        });

        if (!data || data.length === 0) {
          return res.status(200).json({ message: 'No Record Found' });
        }

        res.status(200).json({ data });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: 500, error: 'Internal Server Error' });
      }
    } else if (req.method === "PUT") {
      const id = parseInt(req.query.id);
      const { error, value } = adminSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { name, email, phone, password } = value; // Destructure from 'value'

      const updateAdmin = await prisma.admin.update({
        where: { id: id },
        data: {
          name: name,
          email: email,
          phone: phone,
          password: hashPassword(password)
        }
      });
      return res.status(200).json({ status: 200, data: updateAdmin, message: "Admin is Updated successfully." });
    }else if(req.method==='DELETE')
    {
       
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
}

import prisma from "@/db/db.config";
import { adminSchema } from './fieldValidate/index.js';
import { hashPassword, verifyPassword } from "./validate/hash.js";
import multer from "multer";
// Define the destination directory for uploads
const uploadDirectory = "public/uploads";
const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, cb) => {
    return cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage }).single("image");
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
              id: true,// Added 'select' for correct syntax
              name: true,
              email: true,
              phone: true
            }
          });
          return res.status(200).json({ status: 200, data: data });
        }
        const data = await prisma.admin.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            phone: true

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
    } else if (req.method == "PUT") {
      const id = parseInt(req.query.id);
      const image = req.query.image;

      if (id && image) {
        console.log(id, image);
        upload(req, res, async (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error uploading product image" });
          }
      
          // If there's no error, handle the upload success
         
          const imageName = req.file.filename;
           
      const updateImage=await prisma.admin.update({
        where:{
          id:id
        },data:{
        image:imageName
        }
      })
      if(updateImage)
      {
        return res.status(200).json({ message: "Image Upload Successfully" });
      }else{
        return res.status(400).json({ message: "Error Image Upload" });
      }
        
        });
      } else  if (id) {
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
      }
    } else if (req.method === 'DELETE') {

    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};

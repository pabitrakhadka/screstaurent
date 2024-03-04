import prisma from "@/db/db.config.js";
import { userSchema } from "./fieldValidate/index.js";
import { hashPassword } from "./validate/hash.js";
 
export default async function handler(req, res) {
  try {
    
    
    if (req.method == "POST") {
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { name, phone, address, email, password, confirm_password } =
        req.body;

      const findUser = await prisma.user.findFirst({
        where: {
          user_email: email,
        },
      });

      if (findUser) {
        return res.status(400).json({
          status: 400,
          message: "Email already taken. Please choose another Email.",
        });
      }

      const addUser = await prisma.user.create({
        data: {
          user_name: name,
          user_address: address,
          user_phone: phone,
          user_email: email,
          user_password: hashPassword(password),
        },
      });

      return res.status(200).json({
        status: 200,
        data: addUser,
        message: "User is Added successfully.",
      });
    } else if (req.method == "GET") {
      const id = parseInt(req.query.id);
      if (id) {
      } else {
        const user = await prisma.user.findMany({
          select: {
            user_id: true,
            user_name: true,
            user_address: true,
            user_phone: true,
            user_email: true,
          },
        });
        return res.status(200).json(user);
      }
    } else if (req.method == "PUT") {
      try {
        const id=parseInt(req.query.id);
       if(id)
        {
        const { name, email, phone, location } = req.body;
       
         
     const updateUser = await prisma.user.update({
        where:{
            user_id:id
        },data:{
            location:location
        }
     });
        return res
        .status(200)
        .json({ message: "Success",updateUser});
        }
      } catch (error) {
        console.log("Error");
        return res
        .status(500)
        .json({ status: 500, error: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
}

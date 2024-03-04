import prisma from "@/db/db.config";
import { adminLoginSchema } from "./fieldValidate/index.js";
import { verifyPassword } from "./validate/hash";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  try {
    if (req.method == "POST") {
      const { error, value } = adminLoginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { email, password } = req.body;
      const findAdmin = await prisma.admin.findUnique({
        where: {
          email: email,
        },
      });
      if (!findAdmin || !verifyPassword(password, findAdmin.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      let token;
      // Check if the user has a token in the database
      if (!findAdmin.token) {
        // Generate a new token
        token = jwt.sign(
          { id: findAdmin.id, email: findAdmin.email },
          process.env.JWT_SECRET_KEY
        );
        // Update user's token in the database
        await prisma.admin.update({
          where: { id: findAdmin.id },
          data: { token: token },
        });
      } else {
        // Use the existing token
        token = findAdmin.token;
      }

      return res.status(200).json({
        message: "Login successful",
        token: token,
        id: findAdmin.id,
        name: findAdmin.name,
      });
    } else if (req.method == "GET") {
      const id = parseInt(req.query.id);
      if (id) {
        const adminProfile = await prisma.admin.findMany({
          where: {
            id: id,
          },
          select: {
            name: true,
            phone: true,
            email: true,
          },
        });
        if (!adminProfile || adminProfile.length == 0) {
          return res.status(200).json({ message: "No Record Found !" });
        }
        return res.status(200).json(adminProfile);
      } else {
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error", error: error });
  }
}

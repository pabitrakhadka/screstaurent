import prisma from "@/db/db.config";
import {getServerSession} from "next-auth";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, null);
    if (req.method === "GET") {
      const id = session.user.email;
      
      const user = await prisma.user.findFirst({
          where: {
            user_id: id,
          },select:{
            user_name:true,
            user_email:true,
            user_phone:true
          }
        });
        res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "method not allowed" });
  }
}

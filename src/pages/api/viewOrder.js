
import prisma from "@/db/db.config";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            const session = await getServerSession(req, res, null);
            const id = session.user.email;

             

            const orders = await prisma.order.findMany({
                select: {
                    token_num: true,
                    menu: { select: { name: true } },
                    price: true,
                    status: true,
                    quantity: true,
                    date: true,
                },
                where: {
                    user_id: id,
                },
            });

            res.status(200).json(orders);
      } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
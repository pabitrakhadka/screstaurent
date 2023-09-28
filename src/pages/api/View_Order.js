import { db } from "@/db";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
    /**
     * Fetch User_Orders status name,price, quantity like eg:pending,accept,
     */
    try {
        const session = await getServerSession(req, res, null);

        if (req.method === 'GET') {
            db.getUserOrders(session?.user?.email).then(({ result }) => {
                res.status(200).json({ status: true, result })
            }).catch((error) => {
                res.status(500).json({ error });
            })
        } else {
            res.status(400).json({ message: 'Invalid method' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

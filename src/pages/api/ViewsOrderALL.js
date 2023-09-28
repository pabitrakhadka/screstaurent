import { db } from "@/db";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, null);

        if (req.method === "POST") {
            // Handle POST request
        } else if (req.method === "GET") {
            const productid = req.body;
            const promises = [
                db.GetUserData(session.user.email),
                db.GetProductData(),
                db.GetOrderData()

            ];

            Promise.all(promises)
                .then((results) => {
                    const data1 = results[0];
                    const data2 = results[1];
                    const data3 = results[2];

                    res.status(200).json({
                        data1,
                        data2,
                        data3,
                    });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

import { db } from "@/db";
import { getServerSession } from "next-auth/next"
export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, null);

        if (req.method === 'POST') {
            const data = req.body;
            const queu = [];

            //get random num Order_token
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            //generate token number exist or not 
            //545454
            const token_num = getRandomInt(4, 99999999);
            data.map((item) => {
                //email=id 
                item["user_id"] = session.user.email;
                item['token_num'] = token_num;
                queu.push(db.orderData(item));

            })
            // db.orderData(data)
            Promise.all(queu)
                .then((results) => {
                    res.status(200).json({
                        status: true,
                        message: "Order Received",
                        token_num
                    });
                }).catch((error) => {
                    res.status(500).json({
                        message: "Data not Received", error
                    });
                })
        }

    } catch (error) {
        res.status(500).json({
            error
        });
    }
}
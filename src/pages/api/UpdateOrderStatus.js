import { db } from "@/db";

export default async function handler(req, res) {

    try {

        if (req.method === 'POST') {
            const { token, id, status } = req.body;

            db.updateOrderStatus(status, id, token).then(({ result }) => {
                res.status(200).json({ result });
            }).catch((error) => {
                res.status(200).json({ error });
            })


        }
        else if (req.method === 'GET') {
            const { user_id, token_num } = req.query;

            db.getOerder_Status(user_id, token_num).then(({ result }) => {
                res.status(200).json({
                    status: true,
                    result
                });
            }).catch((error) => {
                res.status(500).json({
                    error
                });
            });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}
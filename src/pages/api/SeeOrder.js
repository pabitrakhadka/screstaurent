import { db } from "@/db";

export default async function handler(req, res) {
    try {

        if (req.method === 'POST') {
            const { user_id, token_num } = req.body;

            db.getOrderDataView(user_id, token_num).then(({ result }) => {
                res.status(200).json({
                    status: true,
                    message: 'success', result
                });
            }).catch((error) => {
                res.status(400).json({ error });
            })
        }
        else if (req.method === 'GET') {
            const { user_id, token_num } = req.query;

            console.log('user id and token numner', user_id, token_num);
            db.GetOrderDetails(user_id, token_num)
                .then(({ result }) => {

                    res.status(200).json({ status: true, result });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}
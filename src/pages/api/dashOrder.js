import { db } from "@/db";

export default async function handler(req, res) {

    try {
        if (req.method === 'GET') {
            db.getOrderRecent().then(({ result }) => {
                res.status(200).json({ status: true, result })
            }).catch((error) => {
                res.status(500).json({ error });
            })
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}
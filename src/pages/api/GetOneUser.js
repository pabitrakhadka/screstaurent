import { db } from "@/db";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, null);
        if (req.method === 'GET') {
            const id = session.user.email;
            console.log("session:", session);
            console.log("session:", session.user.name);
            db.fetchOneUser(id).then(({ result }) => {

                res.status(200).json({ status: true, message: "Session", session, result });
            }).catch(({ error }) => {
                res.status(500).json({ status: false, message: "Method not allowed", error });

            })
        }

    } catch (error) {
        res.status(500).json({ message: "method not allowed" });
    }
}
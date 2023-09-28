import { db } from "@/db";

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;
        db.userContact(name, email, subject, message).then((result) => {
            res.status(200).json({
                status: true,
                message: "Send Data Successfully!",
                result
            });
        }).catch((error) => {
            res.status(500).json({ message: "error ", error });
        })
    }
    else if (req.method === 'GET') {
        const { id } = req.query;
        if (id) {

        } else {

            db.getContact().then(({ result }) => {
                res.status(200).json({
                    success: true,
                    message: "jd",
                    result
                })
            }).catch((error) => {
                res.status(300).json({ error })
            })
        }
    }
    else if (req.method === 'DELETE') {
        const { id } = req.query;
        if (id) {
            db.deleteContact_Details(id).then(({ result }) => {
                res.status(200).json({ status: true, message: "Delect Contact Successfully", result });
            }).catch(({ error }) => {
                res.status(200).json({ status: false, message: "Internal Server Error", error });
            })
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}  
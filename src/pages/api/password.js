import { db } from "@/db";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { email } = req.body;
            db.CheckUser(email).then(({ result }) => {
                if (result === null) {
                    res.status(200).json({ status: false, message: "User not found", result });
                } else {
                    res.status(200).json({ status: true, message: "User found", result });
                }
            });
        } else if (req.method === "PUT") {
            const { newpassword, emails } = req.body;

            db.updatePassword(newpassword, emails)
                .then(({ result }) => {
                    if (result === null) {
                        res.status(500).json({ status: false, message: "Email not found" });
                    } else {
                        res.status(200).json({ status: true, message: "Password update successful" });
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    res.status(500).json({ status: false, message: "Internal Server Error", error });
                });
        }
        else {
            res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

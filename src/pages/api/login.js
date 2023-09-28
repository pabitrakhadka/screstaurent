import { db } from "@/db";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { email, password } = req.body;
            const result = await db.userLogin(email, password);

            // console.log("result", result);

            if (result === null) {
                res.status(200).json({
                    status: false,
                    message: "Invalid Login",
                    result: { result: null } // Nest the result object
                });
            } else {
                res.status(200).json({
                    status: true,
                    message: "Successful Login",
                    result: result // Keep the result object as it is
                });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

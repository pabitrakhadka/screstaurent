import { db } from "@/db"

export default async function handler(req, res) {
    try {

        const data = await db.getspecialProduct();
        res.status(200).json({
            success: true,
            message: "Sucess Data bring in database",
            data,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "error",
        });
    }
}
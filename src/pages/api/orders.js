import { db } from "@/db";
// import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    try {
        // const session = getServerSession(req, res, null);
        if (req.method === 'GET') {
            const { user_id, token_num } = req.query;
            // fetch details about user Order where id and token num are provided
            if (user_id && token_num) {

                db.GetOrderDetails(user_id, token_num).then(({ result }) => {

                    res.status(200).json({ status: true, message: "Get details order in user", result });
                }).catch((error) => {
                    res.status(500).json({ status: false, message: "Internal Server error", error });
                });
            }
            // fetch details about user Order where only id is provided
            else if (user_id) {

                // Add your code to fetch details using user_id
            }
            // fetch all order details
            else {
                db.getAllOrder().then(({ result }) => {
                    res.status(200).json({ status: true, message: "fetch all order_details", result });
                }).catch((error) => {
                    res.status(500).json({ status: false, message: "Server error", error });
                });
            }
        }
        else if (req.method === 'PUT') {
            const { user_id, token_num, status } = req.body;
            console.log('user_id ,tokenNum and status ', user_id, token_num, status);
            db.updateOrderStatus(status, user_id, token_num).then(({ result }) => {
                res.status(200).json({ status: true, message: "Update successfully", result });
            }).catch((error) => {
                res.status(500).json({ status: false, message: "Intenal Server Error", error });
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Method is not allowed" });
    }
}


import { getServerSession } from "next-auth/next"
import { db } from "@/db";

// Rest Api for users
export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, null);
        if (req.method === 'POST') {
            const { name, phone, address, email, password } = req.body;
            db.checkExistingUser({ email }).then(({ result: result }) => {

                if (result === null) {
                    db.registerUser({ name, phone, address, email, password }).then(({ result }) => {
                        res.status(200).json({ status: true, message: "Successful Register" });
                    }).catch((error) => {
                        console.log("er", error)
                        res.status(200).json({ status: false, message: "Invalid input data", error });
                    });
                } else {
                    res.status(200).json({
                        result,
                        status: true,
                        message: "Already Registered. Please Log In.",
                    });
                }
            }).catch((error) => {
                // Handle error from checkExistingUser
                console.log("error checking existing user", error);
                res.status(200).json({ status: false, message: "Error checking existing user" }, error);
            });
        }
        else if (req.method === 'GET') {

            db.getallUser().then(({ result }) => {
                res.status(200).json({ status: true, result });
            }).catch((error) => {
                res.status(200).json({ message: " Syntax error ", error });
            })
        }

        else if (req.method === 'PUT') {

            // Update User Data
            const { name, phone, email, location } = req.body;

            db.UpdateUserData(name, phone, email, location, session.user.email).then(({ result }) => {
                res.status(200).json({
                    status: true,
                    message: "Update Data Sucessfully",
                    result,
                })
            }).catch((error) => {
                res.status(500).json({ message: "servererror", error })
            });

        }
        else if (req.method === 'DELETE') {

        } else {

        }


    } catch (error) {
        console.log("dada pu :", error);
        res.status(500).json({ message: "Error occurred during password verification:", error });
    }
}

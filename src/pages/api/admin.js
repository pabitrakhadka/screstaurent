import { db } from "@/db";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { id } = req.query;
            const { email, password } = req.query;
            if (id) {
                db.getIdAdmin(id).then(({ result }) => {
                    res.status(200).json({ status: true, message: "fetch Admin data", result });
                }).catch((error) => {
                    res.status(200).json({ status: false, message: "sql error", error });
                })
            }
            else if (email && password) {

                db.checkAdmin(email, password).then(({ result }) => {
                    console.log("rd ", result);
                    res.status(200).json({ status: true, message: "succss", result });
                }).catch(({ error }) => {
                    res.status(200).json({ status: false, message: "Error", error });

                })
            }
            else {
                db.getAdminData().then(({ result }) => {
                    res.status(200).json({ status: true, message: "Fetch admin data ", result });

                }).catch((error) => {
                    res.status(200).json({ status: false, message: "sql error", error });

                })
            }

        }

        else if (req.method === 'POST') {
            const { name, email, phone, password } = req.body;

            db.addAdmin(name, email, phone, password).then((result) => {

                res.status(200).json({ status: true, message: "Admin Added Sucessfully", result })

            }).catch((error) => {
                res.status(500).json({ status: false, message: "Internal Server Error" })
            })

        }
        else if (req.method === 'PUT') {
            const { id } = req.query;
            const { name, phone, email, password } = req.body;
            console.log("id,name,phone,emaill,password", id, name, phone, email, password);

            db.updateAdminData(name, phone, email, password, id).then(({ result }) => {
                res.status(200).json({ status: true, message: "Data Updated", result });

            }).catch((error) => {
                res.status(200).json({ status: false, message: "Server Error", error });

            })
        }

        else if (req.method === 'DELETE') {
            const { id } = req.query;

            db.deleteAdmin(id).then((result) => {
                res.status(200).json({ status: true, message: "Delete Successful", result });
            }).catch((error) => {
                res.status(500).json({ status: false, message: "Error", error });
            })
        }

    } catch (error) {
        res.status(200).json({ message: "Method not Allow" });
    }
}
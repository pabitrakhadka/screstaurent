import { db } from "@/db";
import multer from "multer";

//Define the destination directory for uploads
const uploadDirectory = "/tmp/uploads";
const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, cb) => {
        return cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage }).single("image");

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            upload(req, res, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Error uploading product" });
                }
                else {


                    const { name, price, description, special, category } = req.body;

                    db.addProduct({
                        name,
                        price,
                        description,
                        image: req.file.filename,
                        special,
                        category,
                    })
                        .then((result) => {
                            res.status(200).json(result);
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ error: "Internal Server Error" });
                        });
                }
            });
        } else if (req.method === "GET") {
            const { id } = req.query;

            if (id) {
                db.getProductById(id)
                    .then(({ result }) => {
                        res.status(200).json({ status: true, result });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ error: "Internal Server Error" });
                    });
            } else {
                db.getAllProductItem()
                    .then(({ result }) => {
                        res.status(200).json({ status: true, message: "fetch products", result });
                    })
                    .catch((error) => {
                        res.status(500).json({ status: false, message: "Internal Server Error", error });
                    });
            }
        } else if (req.method === "PUT") {
            upload(req, res, (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Error uploading product" });
                }

                const { id } = req.query;
                const { name, price, description, special, category } = req.body;

                db.updateProduct({
                    name,
                    price,
                    description,
                    image: req.file.filename,
                    special,
                    category,
                    id,
                })
                    .then(() => {
                        res.status(200).json({ status: true, message: "Product Update successfuly" });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ error, message: "Internal Server Error" });
                    });
            });
        } else if (req.method === "DELETE") {
            const { id } = req.query;

            db.deleteProduct(id)
                .then(() => {
                    res.status(200).json({ status: true, message: "Delete Product Successfully" });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ status: false, message: "Internal Server Error" });
                });
        } else {
            res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Method not allowed:", error);
        res.status(500).json({ message: "Method not allowed", error });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

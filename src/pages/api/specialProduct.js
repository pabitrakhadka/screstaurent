export default async function handler(req, res) {

    try {
        if (req.method === 'GET') {
            const { id } = req.query;
            if (id) {

            } else {

            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error ", error });
    }
}
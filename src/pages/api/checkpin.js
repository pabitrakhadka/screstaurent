export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { pin } = req.body;
            console.log('pin', pin);
            if (pin == 1111) {
                res.status(200).json({ status: true, message: "Pin Match" });
            } else {
                res.status(200).json({ status: false, message: "Pin Not Match !" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "error", error })
    }
}
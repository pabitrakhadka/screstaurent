import prisma from "@/db/db.config";
import { getServerSession } from "next-auth/next";

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to handle POST requests
async function handlePostRequest(req, res) {
    try {
        const session = await getServerSession(req, res, null);
        const data = req.body;

        let token_num = getRandomInt(4, 99999999);
        const existingOrder = await prisma.order.findFirst({
            where: {
                token_num: token_num.toString(),
            },
        });

        if (!existingOrder) {
            const createdOrders = await Promise.all(
                data.map(async (item) => {
                    const orderData = {
                        user_id: session.user.email,
                        menu_id: item.id,
                        price: item.price.toString(),
                        quantity: item.quantity.toString(),
                        status: "pending",
                        token_num: token_num.toString(),
                    };
                    return await prisma.order.create({ data: orderData });
                })
            );
            res.status(200).json({
                status: true,
                message: "Order Received",
                token_num,
                createdOrders,
            });
        } else {
            token_num = getRandomInt(4, 99999999);
            const createdOrders = await Promise.all(
                data.map(async (item) => {
                    const orderData = {
                        user_id: session.user.email,
                        menu_id: item.id,
                        price: item.price.toString(),
                        quantity: item.quantity.toString(),
                        status: "pending",
                        token_num: token_num.toString(),
                    };
                    return await prisma.order.create({ data: orderData });
                })
            );
            res.status(200).json({
                status: true,
                message: "Order Received",
                token_num,
                createdOrders,
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "An error occurred",
            error,
        });
    }
}

// Function to handle GET requests
async function handleGetRequest(req, res) {
    try {
        const  l  = req.query.l;
        const user_id  = req.query.token_num;
        const token_num  = req.query.token_num;

        console.log("Token Numner and User_id ",token_num,user_id);
        if (token_num&&user_id) {
            const seeOrderData = await prisma.order.findMany({
                select: {
                    user: {
                        select: {
                            user_name: true,
                            user_phone: true, 
                            user_address: true
                        }
                    },
                    menu: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    price: true,
                    quantity: true,
                    date: true,
                    token_num: true,
                }, 
                where: {
                    token_num: token_num,
 
                }
            });
            res.status(200).json(seeOrderData);
        } else if (l) {
            const latestOrders = await prisma.order.findMany({
                select: {
                    user: {
                        select: {
                            user_name: true,
                            user_phone: true, 
                            user_address: true
                        }
                    },
                    menu: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    price: true,
                    quantity: true,
                    date: true,
                    token_num: true,
                }, 
                orderBy: {
                    date: 'desc'
                },
                take: 5,
            });
            res.status(200).json(latestOrders);
        } else {
            const orderList = await prisma.order.findMany({
                orderBy: {
                    date: 'desc'
                },
            });
            if (!orderList) {
                res.status(400).json({ message: "No Record Found" });
            }
            res.status(200).json(orderList);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
}

// Function to handle PUT requests
async function handlePutRequest(req, res) {
    try {
      
        const id =  req.query.id;
        const token_num =  req.query.token_num;

        const { status } = req.body;

        const updateStatus = await prisma.order.updateMany({
            where: {
                user_id: id,
                token_num: token_num,
            },
            data: {
                status: status,
            },
        });
        res.status(200).json({ message: "Success" }, updateStatus);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: "error" });
    }
}

// Main handler function
export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            await handlePostRequest(req, res);
        } else if (req.method === "GET") {
            await handleGetRequest(req, res);
        } else if (req.method === "PUT") {
            await handlePutRequest(req, res);
        } else {
            res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
}

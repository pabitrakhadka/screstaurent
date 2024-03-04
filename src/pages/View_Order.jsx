import Dlayout from "@/components/Dlayout";
import { data } from "autoprefixer";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const View_Order = () => {

    const [orderData, setOrderData] = useState([]);
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState("");

    const router = useRouter();
    const token_num = router.query.token_num;
    const user_id = router.query.user_id;

    
    const updateOrderStatus = async (e,user_id, token_num) => {
        e.preventDefault();
        console.log(" user_id, token, status:",user_id, token_num, status);
        const res = await axios.put(`/api/order?user_id=${user_id}&token_num=${token_num}`, {status });
        
         
        if (res.status===200) {
            toast.success(`${res.data.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
            });
            setTimeout(() => {
                router.push('/order');
            }, 1000)
        } else {
            toast.error(`${res.data.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
            });
            setTimeout(() => {
                router.push('/order');
            }, 1000)
        }
    }


    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {

        if (token_num && user_id) {
            loadData();

        }

    }, [token_num && user_id]);

    const loadData = async () => {
        const res = await axios.get(`/api/order?user_id=${user_id}&token_num=${token_num}`);
       
        if (res.status===200) {
            console.log(res.data);
            setOrderData(res.data);
            setStatus(res.data.status);
            let totalPrice = 0;
            res.data.forEach((item) => {
                totalPrice += parseFloat(item.price); // Assuming price is in number format
            });
            setTotal(totalPrice);
           
           
        }
    };

    return (
        <Dlayout>
            <ToastContainer />
            <h1>View Order</h1>
            <div className="view_Order_container">
                <div className="order_details">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                                <th scope="col">Menu Id</th>
                                <th scope="col">Menu</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Token_Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.map((item, index) => (
                            
                                <tr key={index}>
                                    <td>{item.user.user_name}</td>
                                    <td>{item.user.user_phone}</td>
                                    <td>{item.user.user_address}</td>
                                    <td>{item.menu.id}</td>
                                    <td>{item.menu.name}</td>
                                    <td>Rs.{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.date}</td>
                                    <td>{item.token_num}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2}><b>Total Price</b></td>
                                <td><b>{total}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <form>
                        <label htmlFor="payment">Payment Mode</label>
                        <br />
                        <input type="text" defaultValue="khalti" />
                        <br />
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="status"
                                value={status}
                                onChange={handleStatusChange}
                            >
                                <option value="pending">Select a Status</option>
                                <option value="Accept">Order Accept</option>
                                <option value="Food Ready">Food ready</option>
                                <option value="Delebery Men Received">Delebery Men Received</option>
                                <option value="Food in Your Door">Food in Your Door</option>
                                <option value="Complete">Complete</option>
                            </select>
                            <label htmlFor="floatingSelect">Status</label>
                        </div>
                        <button
                            onClick={(e) => updateOrderStatus(e,user_id, token_num)}
                            className="btn btn-success text-white"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>

        </Dlayout>
    );
};

export default View_Order;

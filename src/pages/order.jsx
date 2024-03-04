import Dlayout from "@/components/Dlayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const order = () => {
  const [order, setOrder] = useState();
  const loadData = async () => {
    const res = await axios.get("/api/order");
    // console.log(res.data);
    if (res.status===200) {
      setOrder(res.data);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Dlayout>
      <div className="fixedposition">
        <h1>Orders List</h1>
      </div>

      <table className=" order_table table my-5">
        <thead>
          <tr>
            <th scope="col">Order id</th>
            <th scope="col">Menu Id</th>
            <th scope="col">UserId</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Date</th>
            <th scope="col">Token_Num</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {order && order.map((item, index) => {

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.menu_id}</td>
                <td>{item.user_id}</td>
                <td>Rs.{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.date}</td>
                <td>{item.token_num}</td>
                <td>{item.status}</td>
                <td>
                  <Link href={`/View_Order?token_num=${item.token_num}&user_id=${item.user_id}`}>
                    <button className="btn bg-primary text-white">View Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </Dlayout >
  );
};

export default order;

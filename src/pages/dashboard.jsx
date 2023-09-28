import Dlayout from "@/components/Dlayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const dashboard = () => {
  const [count, setCount] = useState(0);

  const [order, setOrder] = useState([]);

  const loadData = async () => {
    const res = await axios.get('/api/dashOrder');
    if (res.data.status) {
      setOrder(res.data.result);
    }
  }
  useEffect(() => {
    loadData();
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 100) {
        setCount((prevCount) => prevCount + 1);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [count]);
  return (
    <Dlayout>
      <div className="dashboard_firstRow">
        <div className=" box box1 ">
          <div className="boxinsideflex">
            <div className="box_left ">
              <i className="bi bi-cup-fill fs-1 m-auto p-2"></i>
            </div>
            <div className="box_right">
              <h1 className="number" data-value="1500">
                {count}
              </h1>
              <p>Total</p>
              <p>Menus</p>
            </div>
          </div>
        </div>
        <div className="box box2">
          {" "}
          <div className="boxinsideflex">
            <div className="box_left ">
              <i className="bi bi-cup-fill fs-1 m-auto p-2"></i>
            </div>
            <div className="box_right">
              <h1 className="number" data-value="1500">
                {count}K
              </h1>
              <p>Total</p>
              <p>Orders</p>
            </div>
          </div>
        </div>
        <div className="box box3">
          {" "}
          <div className="boxinsideflex">
            <div className="box_left ">
              <i className="bi bi-cup-fill fs-1 m-auto p-2"></i>
            </div>
            <div className="box_right">
              <h1 className="number" data-value="1500">
                {count}K
              </h1>
              <p>Total</p>
              <p>Users</p>
            </div>
          </div>
        </div>
        <div className="box box4">
          {" "}
          <div className="boxinsideflex">
            <div className="box_left ">
              <i className="bi bi-cup-fill fs-1 m-auto p-2"></i>
            </div>
            <div className="box_right">
              <h1 className="number" data-value="1500">
                {count}M
              </h1>
              <p>Total</p>
              <p>Active Users</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dashbord_SecondRow ">

        <div className="secondrowflex">
          <div className=" box piechart">
            <h1>Recent Order</h1>

            <table className=" order_table table my-5">
              <thead>
                <tr>
                  <th scope="col">Order id</th>
                  <th scope="col">Menu Id</th>
                  <th scope="col">UserId</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {order ? (
  order.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.menu_id}</td>
        <td>{item.user_id}</td>
        <td>Rs,{item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.date}</td>
        <td>{item.status}</td>
        <td>
          <Link href={`/View_Order?token_num=${item.token_num}&user_id=${item.user_id}`}>
            <button className="btn bg-primary text-white">View Details</button>
          </Link>
        </td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan="8">No data available</td>
  </tr>
)}

              </tbody>
            </table>



          </div>

        </div>
      </div>
    </Dlayout>
  );
};

export default dashboard;

import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const categoriBurger = () => {

  const [total, setTotal] = useState();
  const { data: session } = useSession();
  const addCart = (id, name, price) => {
    if (!session?.user) {
      toast.error("Please Login!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    } else {
      const cartItem = { id, name, price, quantity: 1 };
      let isNew = true;
      const data =
        JSON.parse(localStorage.getItem(`${session.user.name}`)) || [];
      data.map((obj, i) => {
        if (obj.id === id) {
          data[i].quantity += cartItem.quantity;
          isNew = false;
        }
      });
      if (isNew) {
        data.push(cartItem);
      }
      localStorage.setItem(`${session.user.name}`, JSON.stringify(data));
      toast.success("Success Cart Added!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    }
  };

  const [burger, setBurger] = useState([]);
  const loadData = async () => {
    const res = await axios.get("/api/products");
    if (res.data.status) {
      setBurger(res.data.result);
    }
  };
  useEffect(() => {
    loadData();
    const datas = JSON.parse(localStorage.getItem(`${session?.user?.name}`));
    setItem(datas);
  }, [session]);
  const [item, setItem] = useState([]);
  const process = () => {
    alert("please login");
    window.location.href = "/checkOut";
  };
  return (
    <Layout>
      <ToastContainer />
      <div className="view pt-5">
        <h1>Categories Burger </h1>
      </div>
      <div className="categoriflex">
        <div className="category_left">
          <div className="row_burger">
            {burger &&
              burger.filter((it) => { return it.category === 'Burger' }).map((item, index) => {
                return (
                  <div key={index} className="cols">
                    <div className="imag">
                      <img
                        src={`/uploads/${item.image}`}
                        alt=""
                      />
                    </div>
                    <div className="category_details">
                      <p>Rs{item.price}</p>
                      <p>{item.name}</p>
                      <button
                        onClick={() => {
                          addCart(item.id, item.name, item.price);
                        }}
                        className="addcart_btn text-white"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="categori_right">
          <h1>Cart</h1>
          <div className="cart_Table">
            <table className="table">
              <thead>
                <tr>

                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>

                </tr>
              </thead>
              <tbody>
                {item && item.filter((ite) => ite.name === 'Burger').map((i, index) => {

                  return (
                    <tr key={index}>

                      <td>{i.name}</td>
                      <td>{i.price}</td>
                      <td>{i.quantity}</td>
                    </tr>
                  )
                })}
                <tr>
                  <td colSpan="2">
                    <b>Total</b>
                  </td>
                  <td>
                    Rs,<b> </b>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default categoriBurger;

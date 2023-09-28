import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const categoriShorma = () => {
  const { data: session } = useSession();
  const [shorma, setShorma] = useState([]);
  const loadProduct = async () => {
    const res = await axios.get("/api/products");

    if (res.data.status) {
      setShorma(res.data.result);
    }
    else {
      toast.error(`${res.data.message}`, {
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
  const [showShorma, setShowShorma] = useState([]);
  useEffect(() => {
    loadProduct();
    const data = JSON.parse(localStorage.getItem(`${session?.user?.name}`));
    setShowShorma(data);

  }, [session]);
  const router = useRouter();

  const addCart = (id, name, price) => {
    if (!session) {

    } else {
      const cartItem = { id, name, price, quantity: 1 };
      let isNew = true;
      const data =
        JSON.parse(localStorage.getItem(`${session.user.name}`)) || [];
      data.map((obj, i) => {
        if (obj.id == id) {
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
  return (
    <Layout>
      <ToastContainer />
      <div className="view pt-5">
        <h1>Categories Shorma </h1>
      </div>
      <div className="categoriflex">
        <div className="category_left">
          <div className="row_burger">
            {shorma &&
              shorma.filter((it) => { return it.category === 'shorma' }).map((item, index) => {
                return (
                  <div key={index} className="cols">
                    <div className="imag">
                      <img src={`/uploads/${item.image}`} alt="" />
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
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {showShorma &&
                  showShorma
                    .filter((item) => {
                      item.name === "shorma";
                    })
                    .map((item, index) => {
                      return (
                        <tr key={index}>
                          <td></td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default categoriShorma;

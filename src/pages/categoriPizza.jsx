import Layout from "@/components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const categoriPizza = () => {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const loadProducts = async () => {
    const res = await axios.get("/api/products");
    if (res.data.status) {
      setData(res.data.result);
    }
  }
  const [item, setItem] = useState([]);
  useEffect(() => {
    loadProducts();
    const datas = JSON.parse(localStorage.getItem(`${session?.user?.name}`));
    setItem(datas);
  }, [session])
  return (
    <>
      <Layout>
        <ToastContainer />
        <div className="view pt-5">
          <h1>Categories Momo </h1>
        </div>

        <div className="categoriflex">
          <div className="category_left">
            <div className="row_burger">
              {data && data.filter((item) => { return item.category === 'pizza' }).map((item, index) => {
                return (
                  <div className="cols" key={index}>
                    <div className="imag">
                      <img src={`/uploads/${item.image}`} alt="" />
                    </div>
                    <div className="category_details">
                      <p>Each@{item.price}</p>
                      <p>{item.name}</p>
                      <button
                        onClick={() => {
                          addCart(item.id, item.name, item.price, item.category);
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
            {session?.user?.email ? (
              <>
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

                      {item && item.filter((ite) => ite.name === 'momo').map((i, index) => {

                        return (
                          <tr key={index}>

                            <td>{i.name}</td>
                            <td>{i.price}</td>
                            <td>{i.quantity}</td>
                          </tr>
                        )
                      })}
                    </tbody>

                  </table>
                </div>
              </>
            ) : ("")

            }
          </div>

        </div>

      </Layout>
    </>
  );
};

export default categoriPizza;

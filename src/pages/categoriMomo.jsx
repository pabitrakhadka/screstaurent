import Layout from "@/components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotLogin from '../components/NotLogin';
import { useRouter } from "next/router";

const categoriMomo = ({ children }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const [getcart, setCart] = useState([]);
  const { data: session } = useSession();

  const loadData = async () => {
    const res = await axios.get("/api/products");
    console.log(res.data);
    if (res.data.status) {
      setData(res.data.result);
    }
  };

  useEffect(() => {
    loadData();
    const datas = JSON.parse(localStorage.getItem(`${session?.user?.name}`));
    setItem(datas);

  }, [session]);

  const addCart = (id, name, price, category) => {
    console.log(id, name, price, category);
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
      setTimeout(() => {
        router.push('/login');
      }, 2000)
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

  return (
    <>
      <ToastContainer />
      <Layout>
        <div className="view pt-5">
          <h1>Categories Momo </h1>
        </div>

        <div className="categoriflex">
          <div className="category_left">
            <div className="row_burger">
              {data && data.filter((item) => { return item.category === 'momo' }).map((item, index) => {
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
                      {/* {item &&
                        item
                          .filter((item) => item.category === "momo")
                          .map((item, index) => {
                            return (
                              <tr key={index}>
                                <td></td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                              </tr>
                            );
                          })} */}
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

export default categoriMomo;

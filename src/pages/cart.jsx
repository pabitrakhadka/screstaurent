import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Login from "./login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotLogin from "../components/NotLogin";
import axios from "axios";
import { set } from "react-hook-form";

const Cart = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orderItem, setOrderItem] = useState([]);
  const [message, setMessage] = useState("Please Order!");
  const allDelete = () => {
    const text = "Do You Yant to All Cart Delete";
    if (confirm(text) == true) {
      localStorage.removeItem(`${session.user.name && session?.user?.image==='user'}`);
      setCartItems([]);
      toast.error("Deleted ?!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    } else {

    }
  };
  const checkoutbtn = () => {

    // router.push('/CheckOuts')
    if (orderItem.length === 0) {
      toast.error("Cart is Empty!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    } else {
      localStorage.setItem("order_itms", JSON.stringify(orderItem));
      router.push('/CheckOuts');

    }
  };

  //Increase and Decrease Quantity
  const updateQuantity = (index, value) => {
    const data = [...cartItems];
    data[index].quantity = value;
    localStorage.setItem(`${session.user.name&& session?.user?.image==='user'}`, JSON.stringify(data));
    setCartItems(data);
    calculateSum();

  }

  const [cartItems, setCartItems] = useState([]);
  // const [setIsChecked] = useState(false);
  const [sum, setSum] = useState(0);

  const handleCheckboxChange = (index, checked) => {
    if (checked) {
      setOrderItem((pre) => {
        return [...pre, cartItems[index]];
      });
    } else {
      setOrderItem((pre) => {
        return pre.splice(index, 1);
      });
    }
  };

  const decreaseQuantity = (index, value) => {
    if (value != 1) {
      value--;
      console.log(index, value);
      const data = [...cartItems];
      data[index].quantity = value;
      localStorage.setItem(`${session.user.name&& session?.user?.image==='user'}`, JSON.stringify(data));
      setCartItems(data);
      calculateSum();
    } else {
      value = 1;
      console.log(index, value);
      const data = [...cartItems];
      data[index].quantity = value;
      localStorage.setItem(`${session.user.name && session?.user?.image==='user'}`, JSON.stringify(data));
      setCartItems(data);
      calculateSum();
    }

  }
  const increaseQuantity = (index, value) => {
    value++;
    console.log(index, value);
    const data = [...cartItems];
    data[index].quantity = value;
    localStorage.setItem(`${session.user.name && session?.user?.image==='user'}`, JSON.stringify(data));
    setCartItems(data);
    calculateSum();
  }
  const calculateSum = () => {
    setTimeout(() => {
      let total = 0;
      cartItems &&
        cartItems.map((item, index) => {
          total += item.quantity * item.price;
        });
      setSum(total);
    }, 100);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(`${session?.user?.name && session?.user?.image==='user'}`));
    setCartItems(data);
    calculateSum();
    
  }, [session?.user?.email==='user']);

  const checkClick = (id, index, name) => {
    const text = "Are you sure !";
    if (confirm(text) == true) {
      console.log(id, index, name);
      let data = JSON.parse(localStorage.getItem(`${session.user.name&& session?.user?.image==='user'}`));
      data.splice(index, 1);
      localStorage.setItem(`${session.user.name&& session?.user?.image==='user'}`, JSON.stringify(data)); // convert array back to string and save in local storage
      setCartItems(data);
      calculateSum();
      console.log(data);
      toast.success("Deleted ?!", {
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
      <Layout>
        <ToastContainer />
        {session?.user?.name && session?.user?.image==='user' && (
          <>
            <div className="cart view p-4">
              <h1>My Cart</h1>
              <div className="butn d-flex justify-content-end align-items-center mb-2">
                <button
                  onClick={() => {
                    allDelete();
                  }}
                  className="btn allbtn mx-2"
                >
                  {" "}
                  <i className="bi bi-trash3"></i>All Delete
                </button>
                <button
                  onClick={checkoutbtn}
                  className="allbtn btn placeholder: mx-2"
                >
                  <i className="bi bi-cart-fill"></i>Chckout
                </button>
                {/* <button
                  onClick={() => {
                    orderProcess();
                  }}
                  className="btn bg-danger text-white mx-2"
                >
                  <i className="bi bi-file-earmark-fill"></i>Save
                </button> */}
              </div>
              <div class="table-responsive">
                <table className="table w-75 m-auto">
                  <thead>
                    <tr>
                      <th scope="col">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="allselect"
                        />
                      </th>

                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems &&
                      cartItems.map((item, index) => {
                        const toal = item.quantity * item.price;

                        return (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                onChange={(e) => {
                                  handleCheckboxChange(
                                    index,
                                    e.target.checked ? true : false
                                  );
                                }}
                                className="form-check-input"
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <i className="bi bi-circle-fill text-success"></i>
                            </td>
                            <td> {item.price} </td>
                            <td className="d-flex justify-center align-center">
                              <div className="flex">
                                <button onClick={() => { decreaseQuantity(index, item.quantity) }} className="increment_btn  incr " ><i className="bi bi-dash-lg fs-4   "></i></button>
                                <p className="mx-2 ">{item.quantity}</p>
                                <button onClick={() => { increaseQuantity(index, item.quantity) }} className="   increment incr"><i className="bi bi-plus-lg fs-4   "></i></button>
                              </div>


                              <button
                                onClick={() => {
                                  checkClick(item.id, index, item.name);
                                }}
                                className="mx-2 incr"
                              >
                                <i className="bi bi-trash  fs-4  "></i>
                              </button>
                            </td>
                            <td>{toal}</td>
                          </tr>
                        );
                      })}
                    <tr>
                      <td colSpan={5}>Total</td>
                      <td>
                        <b>{sum}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-center text-primary">
                <b>{message}</b>
              </p>
            </div>

          </>
        )}

        {!session?.user?.name && !session?.user?.image==='user'&& <>
          <div className="notLogin">
            <NotLogin type="user" />
          </div>
        </>}
      </Layout>
    </>
  );
};

export default Cart;

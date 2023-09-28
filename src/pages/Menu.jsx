import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import NotLogin from "../components/NotLogin";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const menu = () => {
  useEffect(() => {
    AOS.init({ duration: 1500});
  }, []);
  const handleClick = (menuItem) => {
    setCurrent(menuItem);
  };
  const router = useRouter();
  const { data: session, status } = useSession();
  const addcart = (id, name, price) => {
    if (!session) {
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
          data[i].quantity += parseInt(cartItem.quantity);
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



  const [current, setCurrent] = useState('all_menu'); // Update the state variable
  let category = router.query.category || '';
  useEffect(() => {
    if (category != '') {
      setCurrent(category);
    }
  }, [])
  const [item, setItem] = useState([]);
  const loaddata = async () => {
    try {

      const res = await axios.get("/api/products");
      if (res.data.status) {
        setItem(res.data.result);
        
      }
    } catch (errror) {
      console.log(errror);
    }
  };
  useEffect(() => {
    loaddata();
  }, []);

  //Shorma
  //Momo
  //Burger

  const runderDiv = () => {

    switch (current) {
      case 'all_menu':

        return (
          <>
            {item && item.map((item, index) => {
              return (
                <div data-aos="zoom-in" className="specail_col" key={index}>
                  <div className="special_item">
                    <div className="image">
                      <img
                        src={`/uploads/${item.image}`}
                        alt={item.description}
                      />
                    </div>
                    <div className="text-center">
                      <p>Rs.each{item.price}</p>
                      <p className="item_name">{item.name}</p>
                      <button
                        onClick={() => {
                          addcart(item.id, item.name, item.price);
                        }}
                        className="btn allbtn"
                      >
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          </>
        )

      case 'shorma':
        return (
          <>
            {
              item && item.filter((it) => { return it.category === 'shorma' }).map((item, index) => {
                return (
                  <div data-aos="zoom-in" className="specail_col" key={index}>
                    <div className="special_item">
                      <div className="image">
                        <img
                          src={`/uploads/${item.image}`}
                          alt={item.description}
                        />
                      </div>
                      <div className="text-center">
                        <p>Rs.each{item.price}</p>
                        <p className="item_name">{item.name}</p>
                        <button
                          onClick={() => {
                            addcart(item.id, item.name, item.price);
                          }}
                          className="btn allbtn"
                        >
                          Add Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </>
        )
      case 'momo':
        return (
          <>
            {
              item && item.filter((it) => { return it.category === 'momo' }).map((item, index) => {
                return (
                  <div data-aos="zoom-in-down" className="specail_col" key={index}>
                    <div className="special_item">
                      <div className="image">
                        <img
                          src={`/uploads/${item.image}`}
                          alt={item.description}
                        />
                      </div>
                      <div className="text-center">
                        <p>Rs.each{item.price}</p>
                        <p className="item_name">{item.name}</p>
                        <button
                          onClick={() => {
                            addcart(item.id, item.name, item.price);
                          }}
                          className="btn allbtn"
                        >
                          Add Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </>
        )
      case 'burger':
        return (
          <>
            {
              item && item.filter((it) => { return it.category === 'burger' }).map((item, index) => {
                return (
                  <div data-aos="zoom-out-up" className="specail_col" key={index}>
                    <div className="special_item">
                      <div className="image">
                        <img
                          src={`/uploads/${item.image}`}
                          alt={item.description}
                        />
                      </div>
                      <div className="text-center">
                        <p>Rs.each{item.price}</p>
                        <p className="item_name">{item.name}</p>
                        <button
                          onClick={() => {
                            addcart(item.id, item.name, item.price);
                          }}
                          className="btn allbtn"
                        >
                          Add Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </>
        )
      case 'pizza':
        return (
          <>
            {
              item && item.filter((it) => { return it.category === 'pizza' }).map((item, index) => {
                return (
                  <div data-aos="zoom-in-down" className="specail_col" key={index}>
                    <div className="special_item">
                      <div className="image">
                        <img
                          src={`/uploads/${item.image}`}
                          alt={item.description}
                        />
                      </div>
                      <div className="text-center">
                        <p>Rs.each{item.price}</p>
                        <p className="item_name">{item.name}</p>
                        <button
                          onClick={() => {
                            addcart(item.id, item.name, item.price);
                          }}
                          className="btn allbtn"
                        >
                          Add Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </>
        )

      default:
        return <div>Data not found</div>;
    }
  }
  return (
    <Layout>
      <ToastContainer />
      <div id="menu" className="view pt-3">
        <h1 className="text-center   dancing"> Our Menu</h1>
        <div className="filter_menu">
          <ul className="nav nav-pills category_menus">
            <li className={`nav-link ${current === 'all_menu' ? 'active' : ''}`} onClick={() => handleClick('all_menu')}>
              All Menu
            </li>
            <li className={`nav-link ${current === 'shorma' ? 'active' : ''}`} onClick={() => handleClick('shorma')}>
              Shorma
            </li>
            <li className={`nav-link ${current === 'momo' ? 'active' : ''}`} onClick={() => handleClick('momo')}>
              Momo
            </li>
            <li className={`nav-link ${current === 'burger' ? 'active' : ''}`} onClick={() => handleClick('burger')}>
              Burger
            </li>
            <li className={`nav-link ${current === 'pizza' ? 'active' : ''}`} onClick={() => handleClick('pizza')}>
              Pizza
            </li>


          </ul>
        </div>
        <div className="show_menus">
          <div className="specialIemrow">
            {runderDiv()}
          </div>
        </div>

      </div>

    </Layout >
  );
};

export default menu;

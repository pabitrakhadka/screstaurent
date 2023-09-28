import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const categories = () => {
  const router = useRouter();
  const addCart = (name, price) => {
    console.log("Name", name);
    console.log("Price", price);
    // alert("Added Successfully");
    router.push(`/cart?name=${name}&price=${price}`);
  };
  const [item, setItem] = useState([]);
  const loaddata = async () => {
    try {
      const res = await axios.get("/api/getSpecialMenu");
      if (res.data.success) {
        console.log(res.data);
        setItem(res.data.data.result);
      }
    } catch (errror) {
      console.log(errror);
    }
  };
  useEffect(() => {
    loaddata();
  }, []);
  return (
    <Layout>

      <div className="view p-3">
        <h1>Categories</h1>
        <div className="burger">
          <div className="burger_row d-flex justify-content-around">
            {item.map((item, index) => {
              return (
                <div key={index} className="burger_col">
                  <div className="image">
                    <img
                      src={`/uploads/${item.image}`}
                      alt={item.description}
                    />
                  </div>
                  <div className="text-center">
                    <p>{item.price}</p>
                    <p>{item.name}</p>
                    <button
                      onClick={() => {
                        addCart(item.name, item.price);
                      }}
                      className="addcart_btn text-white"
                    >
                      <a href="">Add Cart</a>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default categories;

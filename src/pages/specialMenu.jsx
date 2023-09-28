import Dlayout from "@/components/Dlayout";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
const specialMenu = () => {
  const [del, setDel] = useState(false);
  const deleteProduct = async (id, index) => {
    try {
      if (confirm("Do You Want to Delete !")) {
        const res = await axios.post(
          "/api/deleteProduct",
          {
            id,
            del,
          }
        );
        if (res.data) {
        } else {
          alert("error");
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log("id", id);

    console.log("delete data");
  };
  const [data, setData] = useState([]);
  const loadData = async () => {
    const res = await axios.get("http://localhost:3000/api/getSpecialMenu");
    if (res.data.success) {
      console.log(res.data.data.result);
      setData(res.data.data.result);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Dlayout>

      <div className="fixedposition">
        <button className="addproduct">
          {" "}
          <Link className="addproducts" href="/addproduct">
            Add Product
          </Link>
        </button>
      </div>
      <table className="table my-5">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Descriptin</th>
            <th scope="col">Image</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    src={`/uploads/${item.image}`}
                    alt={item.description}
                    width={70}
                    height={70}
                  />
                </td>
                <td>
                  <Link className=" btn bg-success" href="/editProduct">
                    <i className="bi bi-pencil-square text-white"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn bg-danger text-white"
                    onClick={() => {
                      deleteProduct(item.id, index);
                    }}
                    type="button"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Dlayout>
  );
};

export default specialMenu;

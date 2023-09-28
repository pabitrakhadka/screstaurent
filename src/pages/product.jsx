import Dlayout from "@/components/Dlayout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const product = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  const editproduct = (id) => {
    router.push(`/addproduct?id=${id}`);
  };
  const deleteProduct = async (id, index) => {
    try {

      if (confirm("Do You Want to Delete !")) {
        const res = await axios.delete(
          `/api/products?id=${id}`);
        if (res && res.data.status) {
          const updatedProducts = data.filter((product, i) => i !== index);
          setData(updatedProducts);
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
          });
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
      }
    } catch (error) {
      console.log(error);
    }

  };

  const loaddata = async () => {
    try {
      const res = await axios.get("/api/products");
      console.log(res.data);
      if (res.data.status) {
        setData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loaddata();
  }, []);

  return (
    <Dlayout>
      <ToastContainer />
      <div className="fixedposition">
        <button className="addproduct">
          {" "}
          <Link className="addproducts" href="/addproduct">
            Add Product
          </Link>
        </button>
      </div>
      <div className="producttable table-responsive">
        <table className="table">
          <thead>
            <tr className=" text-center">
              <th scope="col">S.N</th>
              <th scope="col">ProductName</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Photo</th>
              <th colSpan={2} scope="col">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr className=" text-center" key={index}>
                    <td>{index + 1}</td>
                    <td className=" text-">{item.name}</td>
                    <td>RS. {item.price}</td>
                    <td>{item.description}</td>
                    <td className="priduct_imagedisplay">
                      <Image
                        src={`/uploads/${item.image}`}
                        alt={item.description}
                        width={70}
                        height={70}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn bg-danger text-white"
                        onClick={() => {
                          editproduct(item.id);
                        }}
                      >
                        <i className="bi bi-pencil-square text-white"></i>
                      </button>
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
      </div>
    </Dlayout>
  );
};

export default product;

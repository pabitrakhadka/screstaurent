import Dlayout from "@/components/Dlayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const admins = () => {
  const [admin, setAdmin] = useState([]);

  const load = async () => {
    try {
      const res = await axios.get("/api/admin");
      setAdmin(res.data.data);
      

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    load();
  }, []);
  const router = useRouter();
  const editAdmin = (id) => {
    console.log("edit id", id);
    router.push(`/addAdmin?id=${id}`);
  };

  const deleteAdmin = async (id, index) => {

    try {
      if (confirm("Do You Want to Delete !")) {

        const res = await axios.delete(`/api/admin?id=${id}`);
        if (res && res.data.status) {
          const updateAdmin = admin.filter((data, i) => i !== index);
          setAdmin(updateAdmin);
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
          });
        } else {
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


  return (
    <Dlayout>
      <ToastContainer />
      <h1>Manage Admin</h1>
      <div className="fixedposition">
        <button className="addproduct">
          <Link className="addproducts" href="/addAdmin">
            Add Admin
          </Link>
        </button>
      </div>
      <table className="my-5 table">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Password</th>
            <th colSpan={2} scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
        {admin.map((adminData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{adminData.name}</td>
              <td>{adminData.email}</td>
              <td>{adminData.phone}</td>
              <td>**********</td>
              <td>
                <button
                  onClick={() => {
                    editAdmin(adminData.id);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    deleteAdmin(adminData.id, index);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </Dlayout>
  );
};

export default admins;

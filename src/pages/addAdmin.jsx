// import Dlayout from "@/components/Dlayout";
import Dlayout from "../components/Dlayout";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";

const addAdmin = () => {
  const router = useRouter();
  const { query } = useRouter();
  const id = query.id;
  useEffect(() => {
    if (id) {
      loadEditData(id);
    }
  }, [id])
  const loadEditData = async (id) => {
    const res = await axios.get(`/api/admin?id=${id}`);
    
    if (res.status===200) {
      const adminData = res.data.data[0];
       console.log(adminData.name);
      setAdmin({
        name: adminData.name,
        email: adminData.email,
        phone: adminData.phone,
         
      });
    }
  };
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handelInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdmin((pr) => ({ ...pr, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (id) {
      const res = await axios.put(`/api/admin?id=${id}`, admin);
      if (res.data.status) {
        alert(res.data.message);
        router.push("/admins");
      } else {
        alert(res.data.message);
      }
    } else {

      const res = await axios.post("/api/admin", admin);
      if (res.data.status) {

        toast.success(`${res.data.message}`, {
          // console.log("add admin message :", res.data);
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
        setTimeout(() => {
          router.push('/admins');
        }, 3000);

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

  };
  return (
    <>
      <Dlayout>
        <ToastContainer />
        <h1>Add Admin</h1>
        <div className="addadmin">
          <form onSubmit={submitForm}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInputname"
                required
                placeholder="name"
                name="name"
                value={admin.name}
                onChange={handelInputChange}
              />
              <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInputemail"
                required
                placeholder="enter email"
                value={admin.email}
                onChange={handelInputChange}
                name="email"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInputnumber"
                required
                placeholder="enter Phone Number"
                value={admin.phone}
                onChange={handelInputChange}
                name="phone"
              />
              <label htmlFor="floatingInput">Phone</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                required
                placeholder="Password"
                value={admin.password}
                onChange={handelInputChange}
                name="password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {id ? (
              <button className="btn btn-danger my-3" type="submit">
                Update Admin
              </button>
            ) : (
              <button className="btn btn-danger my-3" type="submit">
                Add Admin
              </button>
            )}
          </form>
        </div>

      </Dlayout>
    </>
  );
};

export default addAdmin;

import React, { useState } from "react";
import axios from "axios";
import router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const admin = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handerInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAdmin((pre) => {
      return { ...admin, [name]: value };
    });
  };
  const formsubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(
        `/api/admin?email=${admin.email}&password=${admin.password}`
      );
      if (res.data.status) {

        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000)
      } else {
        toast.error(` Server Error`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`Internal Server Error`, {
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
    <div>
      <ToastContainer />
      <div className="admin">
        <form
          className="shadow-lg p-3 mb-5 bg-body rounded"
          onSubmit={formsubmit}
        >
          <h1 className="text-center m-3">Admin Login</h1>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              name="email"
              value={admin.email}
              onChange={handerInput}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              name="password"
              value={admin.password}
              onChange={handerInput}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="text-center">
            <button className="btn btn-danger text-center" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default admin;

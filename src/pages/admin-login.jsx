import React, { useState } from "react";
import axios from "axios";
import router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
 
const admin = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    loginType:""
  });
  const [pageState, setPageState] = useState({
    error: "",
    processing: false,
  });

  const handleFieldChange = (e) => {

     admin.loginType="admin";
    setAdmin((old) => ({ ...old, [e.target.id]: e.target.value }));
  };
  const simplifyError = (error) => {
    const errorMap = {
      CredentialsSignin: "Invalid username or password",
    };
    return errorMap[error] ?? "Unknown error occurred";
  };

  const handleAuth = async () => {
    setPageState((old) => ({ ...old, processing: true, error: "" }));
    try {
      const response = await signIn("credentials", {
        ...admin,
        
        redirect: false,
      });

      if (response.error) {
        // Handle authentication error
        toast.error("Invalid Email or password", {
          // ...
        });
        setPageState((old) => ({
          ...old,
          processing: false,
          error: response.error,
        }));
      } else if (response.ok) {
        // Handle successful login
        toast.success("Login Successful !", {
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
        }, 1000);
      } else {
        toast.error("Something went wrong!", {
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
      console.error(error);
      // Handle unexpected errors
      setPageState((old) => ({
        ...old,
        processing: false,
        error: "Something went wrong!",
      }));
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="admin">
        <form
          className="shadow-lg p-3 mb-5 bg-body rounded"
        >
          <h1 className="text-center m-3">Admin Login</h1>
          <div className="form-floating mb-3">
          <input
                type="email"
                required
                className="form-control"
                placeholder="name@example.com"
                onChange={handleFieldChange}
                value={admin.email}
                id="email"
              />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
              name="password"
              onChange={handleFieldChange}
              value={admin.password}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
            {pageState.error !== "" && <p> {simplifyError(pageState.error)}</p>}
          <div className="text-center">
          <button
                disabled={pageState.processing}
                onClick={handleAuth}
                className="btn text-center btn allbtn"
                type="submit"
              >
                Login
              </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default admin;

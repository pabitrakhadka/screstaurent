import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useFormik } from "formik";
import { registerDataValidate, signUpSchemas } from "@/schemas";
import Link from "next/link";

const initialValues = {
  name: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  confirm_password: ""
}

const register = () => {
  const router = useRouter();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchemas,
      onSubmit: async (values) => {
        try {
          const res = await axios.post("api/user", values);
      
          if (res.status === 200) {
            toast.success(`${res.data.message}`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              theme: "colored",
            });
      
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }  
            else {
            console.error("Unexpected response:", res);
            toast.error("Unexpected response from server", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              theme: "colored",
            });
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Error submitting form", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
        }
      }
    })



  return (
    <Layout>
      <ToastContainer />
      <div className="container user_register view p-3">
        <h1 className=" text-center">Register</h1>
        <div className="user_login_outer">
          <div className="register_form box_border p-3">
            <form onSubmit={handleSubmit} >
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputname"
                  placeholder="Enter Name"
                  name="name"
                  autoComplete="on"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="name">Full Name</label>
                {errors.name && touched.name ? (
                  <p className="form-error">{errors.name}</p>
                ) : null}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputphone"
                  placeholder="phone"
                  name="phone"
                  autoComplete="on"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone ? (
                  <p className="form-error">{errors.phone}</p>
                ) : null}
                <label htmlFor="phone"> Phone</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputaddress"
                  placeholder="address"
                  name="address"
                  autoComplete="on"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address ? (
                  <p className="form-error">{errors.address}</p>
                ) : null}
                <label htmlFor="address"> Address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput_email"
                  placeholder="name@example.com"
                  name="email"
                  autoComplete="on"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
                <label htmlFor="email">Email address</label>
              </div>
              <div className="d-flex">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error">{errors.password}</p>
                  ) : null}
                  <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPasswordconfirmpassword"
                    placeholder="Password"
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <p className="form-error">{errors.confirm_password}</p>
                  ) : null}
                  <label htmlFor="confirm_password">Password</label>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn allbtn " >
                  Register
                </button>
                <div className="register_footer ">
                  <p className="">
                    Have an account &nbsp;
                    <Link href="/login">Log in ?</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >

    </Layout >
  );
};

export default register;

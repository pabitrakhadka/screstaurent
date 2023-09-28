import Layout from "@/components/Layout";
import { forgotSchema } from "@/schemas";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
const initialValues = {
    newpassword: "",
    confirm_password: "",
};

const Forget = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [currentform, setCurrentform] = useState("forgot");
    const [emails, setUpdateEmail] = useState('');


    //submit email
    const submitEmail = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post("/api/password", {
                email,
            });

            if (res.data.status) {

                setUpdateEmail(email);
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
                    setCurrentform("enterpin");
                }, 1000)
            } else {
                toast.error(`${res.data.message}`, {
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
            console.log("Catch ", error);
        }
    };
    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    };
    const [pin, setPin] = useState('');

    const pinSubmit = async (r) => {
        r.preventDefault();

        const res = await axios.post('/api/checkpin', { pin });
        console.log(res.data);
        if (res.data.status) {
            setUpdateEmail(email);
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
                setCurrentform("changepassword");
            }, 1000)
        } else {
            toast.error(`${res.data.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
            });
            setTimeout(() => {
                setCurrentform("enterpin");
            }, 1000)
        }
        // setUpdateEmail(email);
        // toast.success(`${res.data.message}`, {
        //     position: "top-right",
        //     autoClose: 1000,
        //     hideProgressBar: true,
        //     closeOnClick: false,
        //     pauseOnHover: false,
        //     draggable: false,
        //     theme: "colored",
        // });
        // setTimeout(() => {
        //     setCurrentform("forgot");
        // }, 1000)

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: forgotSchema,
            onSubmit: async (values) => {
                console.log("hello");
                values.emails = emails;
                const res = await axios.put(
                    "/api/password",
                    values
                );
                if (res.data.status) {
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
                        router.push('/login');
                    }, 1000)
                } else {
                    toast.error(`${res.data.message}`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "colored",
                    });
                }
            },
        });


    const renderdiv = () => {
        switch (currentform) {
            case "forgot":
                return (
                    <>
                        <div className="forget_password_div">
                            <div className="text-center">
                                <h4>Forgot Password</h4>
                                <h5>Enter Your Email Address</h5>
                            </div>
                            <form onSubmit={submitEmail}>
                                <div className="form-floating mb-3 pt-2">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        onChange={handleEmail}
                                        value={email}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="allbtn btn">
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                );
            case "enterpin":
                return (
                    <>
                        <div className="enter_pin_outer">
                            <div className="enter_pin_inner">
                                <div className="back_color">
                                    <div className="center_div">
                                        Please Enter Your Pin To send Email
                                    </div>
                                </div>
                                <form onSubmit={pinSubmit}>
                                    <input type="number" required onChange={(e) => setPin(e.target.value)} placeholder="Enter 4 Pin" />

                                    <div className="button">
                                        <button type="submit" name="pin" className="btn bg-success text-white">Next</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
            case "changepassword":
                return (
                    <>
                        <div className="forget_password_div change_password">
                            <h3>New Password</h3>
                            <div className="warning_text bg-warning text-center  m-1 p-1">
                                <p>
                                    Please a New Password That you don't use an any other site
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        name="newpassword"
                                        value={values.newpassword}
                                        onChange={handleChange}
                                        className="form-control"
                                        onBlur={handleBlur}
                                        id="newpassword"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="newpassword">Create New Password</label>
                                    {errors.newpassword && touched.newpassword ? (
                                        <p className="form-error">{errors.newpassword}</p>
                                    ) : null}
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirm_password"
                                        value={values.confirm_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        id="confirm_password"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="confirm_password">Confirm New Password</label>
                                    {errors.confirm_password && touched.confirm_password ? (
                                        <p className="form-error">{errors.confirm_password}</p>
                                    ) : null}
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="allbtn btn">
                                        Change
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                );
        }
    };

    return (
        <Layout>
            <ToastContainer />
            <div className="view  ">
                <div className="forgetPage_view">{renderdiv()}</div>
            </div>
        </Layout>
    );
};

export default Forget;

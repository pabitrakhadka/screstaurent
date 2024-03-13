import Layout from "@/components/Layout";
import { forgotSchema } from "@/schemas";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from 'react';
const initialValues = {
    newpassword: "",
    confirm_password: "",
};

const Forget = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [currentform, setCurrentform] = useState("forgot");
    const [emails, setUpdateEmail] = useState('');
    const [otp, setOTP] = useState({ one: '', two: '', three: '', four: '' });
    const [error, setError] = useState({});
    const inputTwoRef = useRef(null);
    const inputThreeRef = useRef(null);
    const inputFourRef = useRef(null);

    const handleChanges = (e, ref) => {
        const { name, value } = e.target;
        setOTP(prevOTP => ({
            ...prevOTP,
            [name]: value
        }));

        // If the value is entered in the current input, focus on the next input
        if (value && ref) {
            ref.current.focus();
        }
    };

    

    //submit email
    const submitEmail = async (e) => {
        e.preventDefault();
        try {
            console.log(e);
            const res = await axios.get(`/api/userlogin?email=${email}`);
            console.log(res.data);
            if (res.status === 200) {
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
    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
    };
    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    };
    const pinSubmit = async (e) => {
        e.preventDefault();
       
        const newErrors = {};
       
        for (const key in otp) {
            if (!otp[key]) {
                toast.error("Please enter a value", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                });
            } else if (otp[key].length !== 1 || isNaN(otp[key])) {
                newErrors[key] = 'Please enter a single digit';
                toast.error("Please enter a single digit", {
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
        if (Object.keys(newErrors).length === 0) {
            try {
                let pin = `${otp.one}${otp.two}${otp.three}${otp.four}`;
                const response = await axios.post(`/api/userlogin?em=${email}&pin=${pin}`);
                console.log("email and pin", email, pin);
                if (response.status === 200) {
                    setUpdateEmail(email);
                    toast.success(response.data.message, toastOptions);
                    setTimeout(() => setCurrentform("changepassword"), 1000);
                } else {
                    toast.error(response.data.message, toastOptions);
                    setTimeout(() => setCurrentform("enterpin"), 1000);
                }
                setError({});
            } catch (error) {
                console.error("Error submitting PIN:", error);
                toast.error("Error submitting PIN", toastOptions);
            }
        } else {
            setError(newErrors);
        }
    };
    

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: forgotSchema,
            onSubmit: async (values) => {
             console.log(values);
                values.emails = emails;
                const res = await axios.put(
                    "/api/userlogin?changepassword=c",
                    values
                );
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
                        <div className="container-fluid m-auto border shadow-sm p-3 mb-5 bg-body rounded w-25">
                            <div className="image_logo_tick d-flex justify-content-center">
                                <img className="img-thumbnail border-none outline-none" src="https://img.freepik.com/premium-vector/vector-green-check-mark-icon-symbol-logo-circle-tick-symbol-green-color-vector-illustration_488400-339.jpg" height={100} width={100} alt="" />
                            </div>
                            <h3 className="text-center">Enter is Send Your Email </h3>
                            <div class="form-floating mb-3 d-flex">
                            <input
                    name="one"
                    onChange={(e) => handleChanges(e, inputTwoRef)}
                    value={otp.one}
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    maxLength={1}
                />
                <input
                    ref={inputTwoRef}
                    name="two"
                    onChange={(e) => handleChanges(e, inputThreeRef)}
                    value={otp.two}
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    maxLength={1}
                />
                <input
                    ref={inputThreeRef}
                    name="three"
                    onChange={(e) => handleChanges(e, inputFourRef)}
                    value={otp.three}
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    maxLength={1}
                />
                <input
                    ref={inputFourRef}
                    name="four"
                    onChange={handleChanges}
                    value={otp.four}
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    maxLength={1}
                />
                                
                            </div>
                            <div className="button d-flex justify-content-center">
                                <button type="submit" onClick={pinSubmit} className="allbtn btn">
                                    Continue
                                </button>
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

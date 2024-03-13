
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import { validates } from '@/schemas';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { validate } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from 'react-hook-form';
import Khalti from './Khalti';
import crypto from 'crypto';
 



const initialValues = {
    name: "",
    phone: "",
    email: "",
    location: "",
};


const CheckOuts = () => {

    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState(false);

    const parseQueryParams = () => {
        
       

        const { pidx, transaction_id, tidx, amount, total_amount, mobile, status, purchase_order_id, purchase_order_name } = router.query;
        console.log("status=",status);
        // Example conditions, you can adjust them based on your requirements
        if (status === 'Completed') {
            
                setStep(3);
           
        }
      };
      useEffect(() => {
        parseQueryParams();
      }, []);
const { data: session, status } = useSession();
    useEffect(()=>{

    },[session?.user?.image==='user'])
    
    const [showKhalti, setShowKhalti] = useState('');

    const handlePaymentClick = async (value) => {
        if (value === 'khalti') {

            
            const khaltiob = {
                "return_url": "http://localhost:3000/CheckOuts",
                "website_url": "http://localhost:3000/",
                "amount": (sum*100),
                "purchase_order_id": "101",
                "purchase_order_name": "ram",
                "customer_info": {
                    "name": `${values.name}`,
                    "email": `${values.email}`,
                    "phone": `${values.phone}`
                },
            }

            const rs = await axios.post(process.env.KHALTI_API, khaltiob, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `key ${process.env.KHALTI_KEY}`
                }
            });

            if (rs.status === 200) {
                window.location.href = rs.data.payment_url;
                
            }

        }
        else if (value === 'esewa') {
           
                const generateSignature = (message) => {
                    const sicret = "8gBm/:&EnhH.1/q";
                    const hmac = crypto.createHmac("sha256", sicret);
                    hmac.update(message);
                    var hashInBase64 = hmac.digest('base64');
                    return hashInBase64;
                  }
                  const signature = generateSignature('110,test,EPAYTES');
                
                  const formData = {
                    amount: "100",
                    failure_url: "http://localhost:3000/esewa",
                    product_delivery_charge: "0",
                    product_service_charge: "0",
                    product_code: "EPAYTEST",
                    signature: `${signature}`,
                    signed_field_names: "total_amount,transaction_uuid,product_code",
                    success_url: "http://localhost:3000/check",
                    tax_amount: "10",
                    total_amount: "110",
                    transaction_uuid: "ab14a8f2b02c3"
                  };
                  const headers = {
                    "Content-Type": "application/json"
                  };
                  try {
                    // Using a CORS proxy service
                    const res =  await axios.post(
                      'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
                      formData,
                      { headers: headers }
                    );
                    if (res.status === 200) {
                      console.log('success');
                    } else {
                      console.log('error');
                    }
                  } catch (error) {
                    console.error('Error:', error);
                  }
      

        } else {
            alert("SELEct Payment Method");
            setShowKhalti('other');
        }

    };
    const [orderItem, setOrderItem] = useState([]);
    

    const [sum, setSum] = useState();
    const loadUserData = async () => {
        const res = await axios.get(`/api/user_data`);
        if (res.status === 200) {
            values.name = res.data.user_name;
            values.email = res.data.user_email;
            values.phone = res.data.user_phone;
          
 
        }
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: validates,
            onSubmit: async (values) => {

                // const res = await axios.post('api/', values);
                // console.log("k ho data ", values)
                // const res = await axios.post('api/', values);
                // console.log(res.data);
                console.log(values);

            }
        });
       
 
     
    const loadOrder_data = () => {
        const data = JSON.parse(localStorage.getItem('order_itms'));
        setOrderItem(data);

    }
 

    const calculatedTotal = () => {
        let total = 0;
        if (orderItem.length > 0) {
            orderItem.forEach((item) => {
                total += item.price * item.quantity;
            });
        }
        console.log("total price",total,sum);
        setSum(total);
    };


    useEffect(() => {
        loadUserData();
        loadOrder_data();
        
    }, []);
    useEffect(()=>{
        calculatedTotal();
    },[orderItem]);
    const [step, setStep] = useState(0);

    const validateForm = () => {
        if (step === 1) {
            if (values.name !== "" && values.location !== "" && values.email !== "" && values.phone) {
                return true;
            }
            else {
                toast.error("All Input Fiedl are required!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    theme: "colored",
                });
                return false;
            }
        }

    };
    const next = () => {
        if (step == 0) {
            setStep(1);
        }
        else if (step == 1) {
            if (validateForm()) {
                setStep(2);
            }
            else {
                setStep(1);
            }
        }
      
        else if (step == 3) {
           
            const submitOrder = async () => {

           const respond = await axios.put(`/api/user?id=${session?.user?.email}`, values);
        const res = await axios.post('/api/order', orderItem);
             
              

                if (res.status===200 && respond.status===200) {

                //     const token_num = res.data.token_num;
                //     // Create a new object with the token_num property
                //     const tokenObject = {
                //         token_num: token_num
                //     };

                //     // Push the tokenObject to the parsedProducts array
                //     orderItem.push(tokenObject);
                //     // console.log('Order ITem:', orderItem);

                    toast.success("Thanks You For Order", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        theme: "colored",
                    });
                    setTimeout(() => {
                        router.push('/UserOrder');
                    }, 2000);
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
            submitOrder();


        }

    };

    const pre = () => {
        if (step > 0) {
            setStep(step - 1);
        } else {
            setStep(0);
        }
    };


    const steps = [
        'Cart',
        'Login and Address',
        'Payment',
        'Final'
    ];


    const renderForm = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <div>
                            <table className="table checkOut_table">
                                <thead>
                                    <tr>

                                        <th scope="col">Name</th>
                                        <th scope="col">UnitPrice</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderItem && orderItem.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price * item.quantity}</td>
                                                </tr>

                                            )
                                        })
                                    }
                                    <tr>
                                        <td colSpan={3}> Total</td>
                                        <td>{sum}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                );
            case 1:
                return (
                    <div className="form">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} required placeholder="Enter Name" />

                                <label htmlFor="floatingInput">Enter Name</label>
                                {errors.name && touched.name ? (
                                    <p className="form-error">{errors.name}</p>
                                ) : null}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} required id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                                {errors.email && touched.email ? (
                                    <p className="form-error">{errors.email}</p>
                                ) : null}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} id="floatingInput" required placeholder="Enter Number" />
                                <label htmlFor="floatingInput">Enter Phone Number</label>
                                {errors.phone && touched.phone ? (
                                    <p className="form-error">{errors.phone}</p>
                                ) : null}
                            </div>
                            <div >
                                <select className="form-select" name='location' value={values.location} onChange={handleChange} onBlur={handleBlur} required aria-label="Default select example">
                                    <option value="" disabled>Select Your Near Location</option>
                                    <option value="Buspark">Buspart</option>
                                    <option value="Bp Chok">Bp Chok</option>
                                    <option value="Brendra Chok">Brendra Chok</option>
                                </select>
                                {errors.location && touched.location ? (
                                    <p className="form-error">{errors.location}</p>
                                ) : null}
                            </div>

                        </form>
                    </div>
                );
            case 2:
                return (
                    <div className="payment">
                        <div className="payment_row flex">
                            <div className="payment_col">
                                <div className="khalti">
                                    <div className="image" onClick={() => { handlePaymentClick('khalti') }}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Khalti_Digital_Wallet_Logo.png.jpg/640px-Khalti_Digital_Wallet_Logo.png.jpg" alt="" />
                                    </div>


                                </div>
                            </div>
                            <div className="payment_col">
                                <div className="khalti">
                                    <div className="image" onClick={() => { handlePaymentClick('esewa') }}>
                                        <img src="https://cdn.esewa.com.np/ui/images/esewa_og.png?111" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                );
            case 3:
                return (
                    <div className="order_detailss">
                        <h1>Order Details</h1>
                        <div className="order_details_box">
                            <table className='table'>
                                <thead>
                                    <tr>

                                        <th scope="col">Name </th>
                                        <th scope="col">Price </th>
                                        <th scope="col">Quantity </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        orderItem && orderItem.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                        <div className="order_information">
                            <h1>User Information</h1>
                            <table >
                                <tbody>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <td>{values.name}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td>{values.email}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Phone </th>
                                        <td>{values.phone}</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="payment_box">

                        </div>

                    </div>
                );
            default:
                return null;
        }
    }
    return (
        <Layout>
            <ToastContainer />

            <div className='view p-5'>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={step} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                </Box>

                <div className="checkOut_process_view box_border w-75 m-auto">
                    {renderForm()}
                </div>
                <div className="buttons flex mt-3">
                    <button onClick={pre} className='btn bg-primary text-white'>Pre</button>
                    <button onClick={next} className='btn bg-primary text-white'>Next</button>
                </div>
            </div>

        </Layout>
    )
}

export default CheckOuts;
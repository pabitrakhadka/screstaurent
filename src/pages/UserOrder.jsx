
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import NotLogin from "../components/NotLogin";


const UserOrder = () => {


  const { data: session, status } = useSession();
  const [count, setCount] = useState();
  const steps = [

    'Accept',
    'Food Ready',
    'Delebery Men Received',
    'Food in Your Door',
    'Complete'
  ];

  const [message, setMessage] = useState();
  const [token, setToken_num] = useState('');
  const [orderItem, setOrderItem] = useState([]);

  function groupBy(array) {
    const groupedData = {};
    array.forEach(item => {
      const keyValue = item['token_num'];
      if (groupedData[keyValue]) {
        groupedData[keyValue].push(item);
      } else {
        groupedData[keyValue] = [item];
      }
    });
    return Object.values(groupedData);
  }
  const loadOrderItems = async () => {
    const res = await axios.get("/api/viewOrder");
    if (res.status===200) {
console.log(res.data);
      const orders = groupBy(res.data);
      console.log("order:", orders);
      setOrderItem(orders);
      console.log(orderItem);
    }else{
      console.log("Error");
    }
  }



  useEffect(() => {
    loadOrderItems();
  }, [])
  return (
    <Layout>
      {session?.user?.email && (

        <div className='view pt-5'>
          <p>{token}</p>
          <div className="container_order text-center">
            <div className="container_content m-auto">
              <h1>Your Order Status</h1>
              <p className='text-dark fs-5 w-50 m-auto'><i>Delightful! Happiness delivered. Enjoy the journey, embrace the joy. Thank you for choosing us!</i></p>
            </div>
            <div className="user_details_order">
              <div className="img">
                <img src="https://cdn-icons-png.flaticon.com/512/552/552721.png" alt="" />
              </div>
              <div className="user_display_details">
                <h1>Hello, <span>{session?.user?.name}</span> </h1>
              </div> <br />

            </div>
            <div className="show_Order_Container">


              <div className="order_data_user">
                <div class="table-responsive">
                  <table className="table">



                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Order Number</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItem &&
                        orderItem.map((itemGroup, index) => (
                          <React.Fragment key={index}>
                            {itemGroup.map((item, itemIndex) => (
                              <tr key={itemIndex}>
                                <td>{item.menu.name}</td>
                                <td> {item.price}</td>
                                <td>{item.quantity}</td>
                                <td>RS. {item.price * item.quantity}</td>
                                <td>{item.token_num}</td>
                                <td>{item.date}</td>
                              </tr>
                            ))}
                            <tr className="p-3">
                              <td colSpan={6}>
                                <div className="order_status_box">
                                  <Box sx={{ width: '100%' }}>

                                    <Stepper
                                      activeStep={steps.findIndex((step) => step === itemGroup[0].status)}
                                      alternativeLabel
                                    >
                                      {steps.map((label, labelIndex) => (
                                        <Step key={labelIndex}>
                                          <StepLabel>{label}</StepLabel>
                                        </Step>
                                      ))}
                                    </Stepper>
                                  </Box>
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                    </tbody>

                  </table>
                </div>
                {/* <Box sx={{ width: '100%' }}>
      <Stepper activeStep={ } alternativeLabel>
        {steps.map((label,index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box> */}
              </div>
            </div>

          </div>
        </div>
      )}
      {!session?.user?.email && <>
        <div className="notLogin">
          <NotLogin />
        </div>
      </>}
    </Layout>
  )
}

export default UserOrder







